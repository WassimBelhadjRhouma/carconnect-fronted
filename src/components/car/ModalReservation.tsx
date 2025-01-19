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
import BookingService from "../../services/bookingService";
import { buttonStyles } from "../../utils/style/validationFormStyles";
import LoaderSpinner from "../LoaderSpinner";
import ResponseBox, { statusEnum } from "../form/ResponseBox";
import Calendar from "../booking/Calendar";
import useBlockedDates from "../../hooks/useBlockedDates";

const ModalReservation = ({ carId, handleModal }) => {
  const navigate = useNavigate();

  const { blockedDates, isLoading, error } = useBlockedDates(carId);

  const [open, setOpen] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customError, setCustomError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCalendarError = (err) => {
    setCustomError(err);
  };

  const SubmitHandler = async () => {
    // setOpen(false);
    setLoading(true);
    const data = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      message,
    };
    BookingService.addBookingRequest(data, carId)
      .then((res) => {
        // setOpen(false);
      })
      .catch((err) => {
        setShowError(true);
        setLoading(false);
        console.log(err);
      });
    // handleModal(false);
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
              </div>
              <div className="p- mt-6 mb-6">
                {showError && (
                  <ResponseBox
                    title={"Something went wrong, please try again later"}
                    status={statusEnum.Error}
                  />
                )}
              </div>
              <div className="mt-2">
                {/* <Calendar
                  blockedDates={blockedDates}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                  handleCalendarError={handleCalendarError}
                /> */}
                {/* <p className="text-sm text-gray-500">{content}</p> */}
              </div>
              <div className="sm:mt-5">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    // {...register("description")}
                    id="about"
                    name="description"
                    rows={3}
                    className={`block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  placeholder:text-gray-400 focus:ring-2 `}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              {!requestSent && (
                <button
                  type="button"
                  onClick={() => SubmitHandler()}
                  disabled={customError || loading || !startDate || !endDate}
                  className={` ${buttonStyles.base} ${
                    customError || loading || !startDate || !endDate
                      ? buttonStyles.invalid
                      : buttonStyles.valid
                  }`}
                >
                  {loading ? <LoaderSpinner /> : "Send"}
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
