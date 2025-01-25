import { Booking, BookingTypes } from "../../interfaces/BookingInterfaces";
import { ReactNode } from "react";
import BookingCard from "./BookingCard";

interface BookingCardProps {
  bookings: Booking[];
  text: string;
  title?: string;
  children: ReactNode;
  updateBooking: any;
  bookingType: BookingTypes;
}

const BookingSection: React.FC<BookingCardProps> = ({
  children,
  bookings,
  text,
  title,
  updateBooking,
  bookingType,
}) => {
  return (
    <div>
      <div className="mx-auto  max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <div className="flex items-center space-x-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {children}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500">{text}</p>
        </div>
      </div>
      <div className="mt-10">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          {
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {bookings?.length === 0 && (
                <p className="text-gray-400"> No Bookings to display</p>
              )}
              {bookings?.map((booking) => (
                <BookingCard
                  bookingType={bookingType}
                  booking={booking}
                  key={booking.id}
                  updateBooking={updateBooking}
                />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
