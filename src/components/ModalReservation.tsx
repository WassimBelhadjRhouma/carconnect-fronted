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
import Calendar from "../pages/Calendar";
import dayjs from "dayjs";
import BookingService from "../services/bookingService";

const ModalReservation = ({ carId, handleModal }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const SubmitHandler = () => {
    // setOpen(false);
    console.log(startDate, endDate);
    const dates = {
      startDate: dayjs(startDate).unix(),
      endDate: dayjs(endDate).unix(),
    };
    BookingService.addBookingRequest(dates, carId)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dates);
    handleModal(false);
    // navigate(navigateTo);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        handleModal(false);
      }}
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
                  Reservation request
                </DialogTitle>
                <div className="mt-2">
                  <Calendar
                    handleStartDate={handleStartDate}
                    handleEndDate={handleEndDate}
                  />
                  {/* <p className="text-sm text-gray-500">{content}</p> */}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              {!requestSent && (
                <button
                  type="button"
                  onClick={() => SubmitHandler()}
                  className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white 
bg-indigo-600 shadow-sm hover:bg-indigo-500
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  send
                </button>
              )}
              {requestSent && (
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="size-6 text-green-600"
                  />
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalReservation;
