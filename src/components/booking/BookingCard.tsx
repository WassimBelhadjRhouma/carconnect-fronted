import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";
import {
  Booking,
  BookingStatus,
  BookingTypes,
} from "../../interfaces/BookingInterfaces";
import { useEffect, useState } from "react";
import ReviewModal from "../reviewComponent/ReviewModal";
import PaymentService from "../../services/PaymentService";
import { PAYMENT_STATUS } from "../../interfaces/PaymentInterfaces";
import PaypalComponent from "./PaypalComponent";
import LoaderSpinner from "../LoaderSpinner";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../CustomToast";

interface BookingCardProps {
  booking: Booking;
  bookingType: BookingTypes;
  updateBooking?: any;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  bookingType,
  updateBooking,
}) => {
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSucceed, setPaymentSucceed] = useState(false);

  const handlePaymentSucceed = () => {
    setPaymentSucceed(true);
  };
  const notifyError = () => {
    toast.error(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Netweork error!",
        content: "Something went wrong",
      },
      onClose: () => {},

      ariaLabel: "Something went wrong",
    });
  };
  const notifySuccess = () => {
    toast(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Payment Successful!",
        content:
          "Thank you for your payment! The transaction was completed successfully, and your reservation has been confirmed.",
      },
      pauseOnFocusLoss: false,
      ariaLabel:
        "Thank you for your payment! The transaction was completed successfully, and your reservation has been confirmed.",
      onClose: () => {},
    });
  };
  const createPayment = async (id) => {
    try {
      const res = await PaymentService.createPayment(id);
      notifySuccess();
    } catch (err) {
      console.log(err);
      notifyError();
    }
  };
  useEffect(() => {
    if (paymentSucceed) {
      createPayment(booking.id);
    }
  }, [paymentSucceed]);

  const clearModal = () => {
    setViewModal(false);
  };

  return (
    <div
      key={booking?.id}
      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
    >
      <ToastContainer />
      {viewModal && (
        <ReviewModal
          bookingId={booking.id}
          viewModal={viewModal}
          clearModal={clearModal}
          title={"Your review matter"}
          textButton={"Add Review"}
          navigateTo={""}
          carId={booking.car.id}
        />
      )}
      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-gray-900">From</dt>
            <dd className="mt-1 text-gray-500">{booking.startDate}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-gray-900">To</dt>
            <dd className="mt-1 text-gray-500">{booking.endDate}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Total amount</dt>
            <dd className="mt-1 font-medium text-gray-900">
              € {booking.amount}
            </dd>
          </div>
        </dl>
      </div>

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="divide-y divide-gray-200">
        <li key={booking.id} className="p-4 sm:p-6">
          <div className="flex items-center sm:items-start">
            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
              <img
                alt={booking.car.images[0]}
                src={booking.car.images[0]}
                className="size-full object-cover"
              />
            </div>
            <div className="ml-6 flex-1 text-sm">
              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                <h5>
                  {bookingType === BookingTypes.OWNER
                    ? "Message from the Renter:"
                    : "Message "}
                </h5>
                <p className="mt-2 sm:mt-0">
                  €{booking.car.pricePerDay}{" "}
                  <span className="text-gray-400 text-xs">/day</span>{" "}
                </p>
              </div>
              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                {booking.message ||
                  "this is gonna be the message sent by the renter. For the moment it's manually written. everything else is fetched from the database"}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex sm:justify-between">
            <div className="flex items-center">
              {booking.status == BookingStatus.PENDING && (
                <ClockIcon
                  aria-hidden="true"
                  className="size-5 text-yellow-500"
                />
              )}

              {booking.status == BookingStatus.ACCEPTED && (
                <CheckCircleIcon
                  aria-hidden="true"
                  className="size-5 text-green-500"
                />
              )}

              <p className="ml-2 text-sm font-medium text-gray-500">
                {paymentSucceed || booking.paid ? "CONFIRMED" : booking.status}
                {(booking.paid || paymentSucceed) &&
                  booking.status === BookingStatus.ACCEPTED &&
                  ` - ${PAYMENT_STATUS.PAID}`}
                {!booking?.paid &&
                  !paymentSucceed &&
                  booking.status === BookingStatus.ACCEPTED &&
                  ` - ${PAYMENT_STATUS.UNPAID}`}
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
              {isLoading && <LoaderSpinner color="primary" text="Loading..." />}
              {booking.status === BookingStatus.ACCEPTED &&
                bookingType === BookingTypes.RENTER &&
                !booking?.paid && (
                  <PaypalComponent
                    amount={booking.amount}
                    handlePaymentSucceed={handlePaymentSucceed}
                  />
                )}

              {booking.status === BookingStatus.PENDING &&
                bookingType != BookingTypes.RENTER && (
                  <div className="flex flex-1 justify-center">
                    <button
                      onClick={() =>
                        updateBooking.mutate({
                          bookingId: booking.id,
                          newStatus: BookingStatus.ACCEPTED,
                        })
                      }
                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                    >
                      Accept
                    </button>
                  </div>
                )}

              {booking.status === BookingStatus.PENDING &&
                bookingType == BookingTypes.OWNER && (
                  <div className="flex flex-1 justify-center pl-4">
                    <button
                      onClick={() =>
                        updateBooking.mutate({
                          bookingId: booking.id,
                          newStatus: BookingStatus.REFUSED,
                        })
                      }
                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                    >
                      Refuse
                    </button>
                  </div>
                )}
              {booking.status === BookingStatus.PENDING &&
                bookingType === BookingTypes.RENTER && (
                  <div className="flex flex-1 justify-center pl-4">
                    <button
                      onClick={() =>
                        updateBooking.mutate({
                          bookingId: booking.id,
                          newStatus: BookingStatus.CANCELLED,
                        })
                      }
                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                    >
                      {"Cancel"}
                    </button>
                  </div>
                )}

              {booking.status === BookingStatus.COMPLETED &&
                bookingType === BookingTypes.RENTER &&
                !booking.reviewed && (
                  <div className="flex flex-1 justify-center pl-4">
                    <button
                      onClick={() => setViewModal(true)}
                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                    >
                      {"Add Review"}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BookingCard;
