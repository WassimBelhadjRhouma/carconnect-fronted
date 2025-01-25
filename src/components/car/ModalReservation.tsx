import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import BookingService from "../../services/bookingService";
import { buttonStyles } from "../../utils/style/validationFormStyles";
import LoaderSpinner from "../LoaderSpinner";
import ResponseBox, { statusEnum } from "../form/ResponseBox";
import Calendar from "../booking/Calendar";
import useBlockedDates from "../../hooks/useBlockedDates";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../CustomToast";

const ModalReservation = ({ carId, handleModal }) => {
  const { blockedDates } = useBlockedDates(carId);

  const [open, setOpen] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customError, setCustomError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "I hope this message finds you well. My name is [Your Name], and I am reaching out regarding your car listed for [rental/sale] on [platform name or reference]."
  );

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCalendarError = (err) => {
    setCustomError(err);
  };
  const notifyError = () => {
    toast.error(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Netweork error!",
        content: "Something went wrong",
      },
      ariaLabel: "Something went wrong",
      onClose: () => {
        handleModal();
        setOpen(false);
      },
    });
  };
  const notifySuccess = () => {
    toast(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Reservation Request Sent!",
        content:
          "The owner has received your reservation request. You will be notified once they make a decision.",
      },
      ariaLabel:
        "Our team is reviewing your documents and will get back to you shortly.",
      onClose: () => {
        {
          handleModal();
          setOpen(false);
        }
      },
    });
  };
  const SubmitHandler = async () => {
    setLoading(true);
    console.log("start date:", format(startDate, "yyyy-MM-dd"));

    const data = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      message,
    };
    BookingService.addBookingRequest(data, carId)
      .then((res) => {
        notifySuccess();
        setRequestSent(true);
      })
      .catch((err) => {
        notifyError();

        setShowError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <ToastContainer />

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
              <div className="mt-2 ">
                <Calendar
                  blockedDates={blockedDates}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                  handleCalendarError={handleCalendarError}
                  months={1}
                />
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
                    id="about"
                    name="description"
                    placeholder="I hope this message finds you well. My name is [Your Name], and I am reaching out regarding your car listed for [rental/sale] on [platform name or reference]."
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
                  disabled={
                    customError ||
                    loading ||
                    !startDate ||
                    !endDate ||
                    requestSent
                  }
                  className={` ${buttonStyles.base} ${
                    customError ||
                    loading ||
                    !startDate ||
                    !endDate ||
                    requestSent
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
