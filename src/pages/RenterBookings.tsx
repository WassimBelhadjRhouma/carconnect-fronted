import { useEffect, useMemo, useState } from "react";
import BookingCard from "../components/booking/BookingCard";
import BookingService from "../services/bookingService";
import { EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Booking,
  BookingStatus,
  BookingTypes,
  GetBookingsResponse,
} from "../interfaces/BookingInterfaces";
import { DocumentIcon } from "@heroicons/react/24/outline";
import BookingSection from "../components/booking/BookingSection";
import ReviewModal from "../components/reviewComponent/ReviewModal";
import cx from "clsx";

enum TabType {
  BOOKING_REQUESTS = "Booking Requests",
  ONGOING_BOOKINGS = "Ongoing Bookings",
  HISTORY = "History",
}

export default function OwnerBookings() {
  const tabs = [
    { id: 1, name: TabType.BOOKING_REQUESTS },
    { id: 2, name: TabType.ONGOING_BOOKINGS },
    { id: 3, name: TabType.HISTORY },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<GetBookingsResponse>({
    queryKey: ["bookings"],
    queryFn: () => BookingService.getBookings(),
  });

  const updateBooking = useMutation({
    mutationFn: ({
      bookingId,
      newStatus,
    }: {
      bookingId: number;
      newStatus: BookingStatus;
    }) => BookingService.updateBookingStatus(bookingId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // Refetch the bookings
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });
  console.log(bookings);

  const pendingBookings: Booking[] = [];
  const confirmedBookings: Booking[] = [];
  const completedBookings: Booking[] = [];

  bookings?.renterBookings.forEach((booking) => {
    switch (booking.status) {
      case BookingStatus.PENDING:
        pendingBookings.push(booking);
        break;
      case BookingStatus.ACCEPTED:
        confirmedBookings.push(booking);
        break;
      case BookingStatus.REFUSED:
      case BookingStatus.COMPLETED:
      case BookingStatus.CANCELLED:
        completedBookings.push(booking);
        break;
      default:
        break;
    }
  });

  return (
    <div className="bg-white">
      <div className="flex justify-center items-center text-center cursor-pointer">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cx(
              "px-10 py-3 border rounded-sm bg-none text-black hover:bg-gray-50  transition ease-out duration-200",
              `${
                currentTab.id === tab.id &&
                "bg-primary text-white hover:bg-primary hover:text-white"
              }`
            )}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div className="py-16 sm:py-24">
        {/* booking requests */}

        {currentTab.name === TabType.BOOKING_REQUESTS && (
          <BookingSection
            bookingType={BookingTypes.RENTER}
            title="Booking Requests"
            text="we’ve got your ongoing bookings covered! Check their progress
              here, and reach out if you need a hand."
            bookings={pendingBookings}
            updateBooking={updateBooking}
          >
            <EnvelopeIcon
              aria-hidden="true"
              className="size-10 text-text-gray-700"
            />
          </BookingSection>
        )}

        {currentTab.name === TabType.ONGOING_BOOKINGS && (
          <BookingSection
            bookingType={BookingTypes.RENTER}
            title="Ongoing Bookings"
            text="we’ve got your ongoing bookings covered! Check their progress
              here, and reach out if you need a hand."
            bookings={confirmedBookings}
            updateBooking={updateBooking}
          >
            <ArrowPathIcon
              aria-hidden="true"
              className="size-10 text-green-900"
            />
          </BookingSection>
        )}

        {/*History */}
        {currentTab.name === TabType.HISTORY && (
          <BookingSection
            bookingType={BookingTypes.RENTER}
            title="History"
            text="look back on your past reservations and keep track of everything
                with ease."
            bookings={completedBookings}
            updateBooking={updateBooking}
          >
            <ArrowPathIcon
              aria-hidden="true"
              className="size-10 text-green-900"
            />
          </BookingSection>
        )}
      </div>
    </div>
  );
}
