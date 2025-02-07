import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { Review } from "../../interfaces/ReviewInterfaces";

interface MyComponentProps {
  title: string;
  textButton: string;
  navigateTo?: string;
  viewModal: boolean;
  clearModal: any;
  carId: number;
  bookingId: number;
}

const ReviewModal: React.FC<MyComponentProps> = ({
  title,
  textButton,
  navigateTo,
  viewModal,
  clearModal,
  carId,
  bookingId,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

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

  const SubmitHandler = async () => {
    const data: Review = {
      comment,
      rating: selectedRating,
      car: {
        id: carId,
      },
      booking: {
        id: bookingId,
      },
    };

    setOpen(false);
    clearModal();
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
                </div>{" "}
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
                    id="about"
                    name="description"
                    rows={3}
                    className={`block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>{" "}
            </div>
            <div className="mt-5 sm:mt-6">
              {
                <button
                  type="button"
                  onClick={() => SubmitHandler()}
                  className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
                >
                  {textButton}
                </button>
              }
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
