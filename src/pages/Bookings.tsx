import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import BookingService from "../services/bookingService";

const orders = [
  {
    number: "4376",
    status: "Delivered on January 22, 2021",
    href: "#",
    invoiceHref: "#",
    products: [
      {
        id: 1,
        name: "Machined Brass Puzzle",
        href: "#",
        price: "$95.00",
        color: "Brass",
        size: '3" x 3" x 3"',
        imageSrc: "/img1.jpg",
        imageAlt:
          "Brass puzzle in the shape of a jack with overlapping rounded posts.",
      },
      // More products...
    ],
  },
  // More orders...
];
export default function Bookings() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    BookingService.getBookings()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return <BookingCard />;
}
