import React from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

interface MyComponentProps {
  interactive?: boolean;
}

const ReviewStars: React.FC<MyComponentProps> = ({ interactive = false }) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedRating, setSelectedRating] = useState(1);

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const handleClick = (index) => {
    setSelectedRating(index);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-6 w-6 cursor-pointer ${
            hoveredStar >= star || selectedRating >= star
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
          aria-hidden="true"
          onMouseEnter={interactive ? () => handleMouseEnter(star) : () => {}}
          onMouseLeave={handleMouseLeave}
          onClick={interactive ? () => handleClick(star) : () => {}}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
