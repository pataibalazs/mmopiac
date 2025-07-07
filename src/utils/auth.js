// Auth utility functions for managing authentication state

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Redirect to home page or login page
  window.location.href = "/";
};

export const setAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Function to make authenticated API requests
export const authenticatedFetch = async (url, options = {}) => {
  const token = getToken();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    // If token is invalid (401), logout user
    if (response.status === 401) {
      logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error("Authenticated fetch error:", error);
    throw error;
  }
};

// Strapi API endpoints
export const API_BASE_URL = "http://127.0.0.1:1337/api";

// API helper functions using JWT authentication
export const strapiAPI = {
  // Get user profile
  getProfile: async () => {
    return await authenticatedFetch(`${API_BASE_URL}/users/me`);
  },

  // Create an order
  createOrder: async (orderData) => {
    return await authenticatedFetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ data: orderData }),
    });
  },

  // Get user orders
  getUserOrders: async () => {
    return await authenticatedFetch(
      `${API_BASE_URL}/orders?filters[user][$eq]=${getUser()?.id}`
    );
  },

  // Update user profile
  updateProfile: async (userData) => {
    const user = getUser();
    return await authenticatedFetch(`${API_BASE_URL}/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Get products
  getProducts: async () => {
    return await authenticatedFetch(
      `${API_BASE_URL}/products?populate[vendor][populate]=*`
    );
  },

  // Create a vendor
  createVendor: async (vendorData) => {
    return await authenticatedFetch(`${API_BASE_URL}/vendors`, {
      method: "POST",
      body: JSON.stringify({ data: vendorData }),
    });
  },

  // Get user vendor
  getUserVendor: async () => {
    const user = getUser();
    return await authenticatedFetch(
      `${API_BASE_URL}/vendors?filters[owner][$eq]=${user?.id}`
    );
  },

  // Update vendor
  updateVendor: async (vendorId, vendorData) => {
    return await authenticatedFetch(`${API_BASE_URL}/vendors/${vendorId}`, {
      method: "PUT",
      body: JSON.stringify({ data: vendorData }),
    });
  },

  // Get vendor products
  getVendorProducts: async () => {
    const user = getUser();
    return await authenticatedFetch(
      `${API_BASE_URL}/products?filters[vendor][owner][$eq]=${user?.id}&populate=vendor`
    );
  },

  // Get vendor orders
  getVendorOrders: async () => {
    const user = getUser();
    return await authenticatedFetch(
      `${API_BASE_URL}/orders?filters[vendor][owner][$eq]=${user?.id}`
    );
  },

  // Create a product
  createProduct: async (productData) => {
    return await authenticatedFetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify({ data: productData }),
    });
  },

  // Associate product with vendor
  associateProductWithVendor: async (
    vendorDocumentId,
    productId,
    productDocumentId
  ) => {
    return await authenticatedFetch(
      `${API_BASE_URL}/vendors/${vendorDocumentId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: {
            products: {
              connect: [
                {
                  id: productId,
                  documentId: productDocumentId,
                  isTemporary: false,
                },
              ],
              disconnect: [],
            },
          },
        }),
      }
    );
  },

  // Get a single product by documentId
  getProduct: async (productDocumentId) => {
    return await authenticatedFetch(
      `${API_BASE_URL}/products/${productDocumentId}?populate=vendor`,
      {
        method: "GET",
      }
    );
  },

  // Update a product by documentId
  updateProduct: async (productDocumentId, productData) => {
    return await authenticatedFetch(
      `${API_BASE_URL}/products/${productDocumentId}`,
      {
        method: "PUT",
        body: JSON.stringify({ data: productData }),
      }
    );
  },

  // Delete a product by documentId
  deleteProduct: async (productDocumentId) => {
    return await authenticatedFetch(
      `${API_BASE_URL}/products/${productDocumentId}`,
      {
        method: "DELETE",
      }
    );
  },

  // Associate vendor with user
  associateVendorWithUser: async (vendorId, vendorDocumentId) => {
    const user = getUser();

    // Get user's documentId - if not available, fetch it from profile
    let userDocumentId = user.documentId;
    if (!userDocumentId) {
      try {
        const profileResponse = await strapiAPI.getProfile();
        if (profileResponse && profileResponse.ok) {
          const profileData = await profileResponse.json();
          userDocumentId = profileData.documentId;
        }
      } catch (error) {
        console.error("Error fetching user profile for documentId:", error);
      }
    }

    return await authenticatedFetch(
      `${API_BASE_URL}/vendors/${vendorDocumentId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: {
            owner: {
              connect: [
                {
                  id: user.id,
                  documentId: userDocumentId || user.documentId,
                  isTemporary: false,
                },
              ],
              disconnect: [],
            },
          },
        }),
      }
    );
  },
};

// Function to validate JWT token
export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      // Update user data in localStorage
      setAuthData(token, userData);
      return true;
    } else {
      // Token is invalid, logout user
      logout();
      return false;
    }
  } catch (error) {
    console.error("Token validation error:", error);
    logout();
    return false;
  }
};

// Auto-refresh user data periodically
export const startTokenValidation = () => {
  // Validate token every 30 minutes
  setInterval(() => {
    if (isAuthenticated()) {
      validateToken();
    }
  }, 30 * 60 * 1000); // 30 minutes
};
