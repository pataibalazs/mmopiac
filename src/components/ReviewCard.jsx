import React from "react";
import Star from "../components/Star";

const ReviewCard = ({ name, rating, comment, date, homepage }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col justify-between ${homepage ? 'px-10' : ''}`}>
      <div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} isActive={i < rating} size="4" isClickable={false} />
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700 mb-2">{comment}</p>
      </div>
      <p className="text-gray-500 text-sm">{formattedDate}</p>
    </div>
  );
};

export default ReviewCard;
