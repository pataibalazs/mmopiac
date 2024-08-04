import React from "react";
import ReactDOM from "react-dom";
import BuyingProcessBar from "../src/components/BuyingProcessBar"; // Corrected path

document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.getElementById("buying-process-bar-root");
  if (rootElement) {
    ReactDOM.render(<BuyingProcessBar step={1} />, rootElement); // Pass the step prop here
  }
});
