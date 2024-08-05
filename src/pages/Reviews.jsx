import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import StarBig from "../components/StarBig";
import Modal from "../components/Modal";

const getFormattedDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "https://thawing-dawn-87843-f5b692533558.herokuapp.com/db/get_comments"
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReviewData = {
      username: "Látogató",
      comment_text: newReview.comment,
      rating: newReview.rating,
      comment_date: getFormattedDate(),
    };

    try {
      await fetch(
        "https://thawing-dawn-87843-f5b692533558.herokuapp.com/db/insert_comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReviewData),
        }
      );
      setNewReview({ rating: 0, comment: "" });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="mt-6 p-6 w-11/12 md:w-2/3 lg:w-3/4">
        <p className="mt-2 text-md font-bold tracking-tight text-amber-500 text-center">
          Értékelések
        </p>
        <h1 className="text-3xl font-bold mb-10 text-center">
          Kíváncsiak vagyunk a visszajelzésedre!:)
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-6 w-full"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Hány csillagra értékelnéd szolgáltatásunkat?
            </label>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarBig
                  key={i}
                  isActive={i < newReview.rating}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  size="6"
                  isClickable={true}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              rows="4"
              placeholder="Írd meg a visszajelzésedet"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-500"
          >
            Beküldés
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.username}
              rating={review.rating}
              comment={review.comment_text}
              date={review.comment_date}
            />
          ))}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Thank you for your feedback!</p>
      </Modal>
    </div>
  );
};

export default ReviewsPage;
