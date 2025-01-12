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
  title: string;
  textButton: string;
  navigateTo?: string;
  viewModal: boolean;
  clearModal: any;
  carId: number;
}

const ReviewModal: React.FC<MyComponentProps> = ({
  title,
  textButton,
  navigateTo,
  viewModal,
  clearModal,
  carId,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

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
  console.log(selectedRating);

  const SubmitHandler = async () => {
    console.log(selectedRating);
    console.log(comment);
    const data: Review = {
      comment,
      rating: selectedRating,
      car: {
        id: carId,
      },
    };
    try {
      const res = await ReviewService.addReview(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
    clearModal();
    // navigate(navigateTo);
  };

  useEffect(() => {
    setOpen(true);
  }, [viewModal]);

  return (
    <Dialog
      open={open}
      onClose={() => SubmitHandler()}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>
              </div>
              <div className="flex items-center space-x-4 sm:mt-8 sm:mt-8">
                <h1 className=" text-sm/6 font-medium text-gray-900">
                  Rate Your Experience
                </h1>{" "}
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
                      onMouseEnter={() => handleMouseEnter(star)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="sm:mt-5 mt-12">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Review
                </label>

                <div className="mt-2">
                  <textarea
                    // {...register("description")}
                    id="about"
                    name="description"
                    rows={3}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>{" "}
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => SubmitHandler()}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {textButton}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
