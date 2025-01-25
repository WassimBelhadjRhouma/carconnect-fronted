import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Review } from "../../interfaces/ReviewInterfaces";
import dayjs from "dayjs";

interface MyComponentProps {
  review: Review;
}

const ReviewCard: React.FC<MyComponentProps> = ({ review }) => {
  return (
    <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
        <div className="flex items-center xl:col-span-1">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 ${
                  review.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-700">
            <span className="sr-only"> out of 5 stars</span>
          </p>
        </div>

        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
          <h3 className="text-sm font-medium text-gray-900">
            {review.comment}
          </h3>

          <div className="mt-3 space-y-6 text-sm text-gray-500">
            {review.comment} + Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Cum consectetur quibusdam expedita voluptatum quo
            nulla nostrum, vero ipsam, amet eveniet excepturi quisquam dolorem
            libero iste nesciunt dolorum explicabo! Porro, temporibus.
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
        <p className="font-medium text-gray-900">{review.userName}</p>
        <time className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
          {dayjs(review.submittedAt).format("MMMM D, YYYY")}
        </time>
      </div>
    </div>
  );
};

export default ReviewCard;
