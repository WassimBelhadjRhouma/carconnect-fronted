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

export default function OwnerBookings() {
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
  const pendingBookings: Booking[] = [];
  const confirmedBookings: Booking[] = [];
  const completedBookings: Booking[] = [];

  bookings?.ownerRequests.forEach((booking) => {
    switch (booking.status) {
      case BookingStatus.PENDING:
        pendingBookings.push(booking);
        break;
      case BookingStatus.ACCEPTED:
        confirmedBookings.push(booking);
        break;
      case BookingStatus.REFUSED:
      case BookingStatus.COMPLETED:
        completedBookings.push(booking);
        break;
      default:
        break;
    }
  });

  console.log("bookings:", bookings);

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        {/* booking requests */}

        <BookingSection
          bookingType={BookingTypes.OWNER}
          title="Booking Requests"
          text="we’ve got your ongoing bookings covered! Check their progress
              here, and reach out if you need a hand."
          bookings={pendingBookings}
          updateBooking={updateBooking}
        >
          <EnvelopeIcon aria-hidden="true" className="size-10 text-green-600" />
        </BookingSection>

        <BookingSection
          bookingType={BookingTypes.OWNER}
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

        {/*History */}

        <BookingSection
          bookingType={BookingTypes.OWNER}
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
      </div>
    </div>
  );
}
