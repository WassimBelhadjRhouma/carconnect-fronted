import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import ReviewService from "../../services/ReviewService";
import { Review } from "../../interfaces/ReviewInterfaces";

interface MyComponentProps {
  interactive?: boolean;
}

const ReviewStars: React.FC<MyComponentProps> = ({ interactive = false }) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Tracks the hovered star
  const [selectedRating, setSelectedRating] = useState(1); // Tracks the clicked star

  const handleMouseEnter = (index) => {
    setHoveredStar(index); // Set hovered star
  };

  const handleMouseLeave = () => {
    setHoveredStar(null); // Reset hover when leaving
  };

  const handleClick = (index) => {
    setSelectedRating(index); // Set clicked star as the selected rating
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
