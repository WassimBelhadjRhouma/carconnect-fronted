import classNames from "classnames";
import {
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  InboxArrowDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AddDucumentModal from "./admin/AddDocumentModal";
import { USER_TYPES } from "../interfaces/AuthInterfaces";
import {
  ArrowLeftStartOnRectangleIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Listings",
    href: "/dashboard/mylistings",
    icon: PencilSquareIcon,
  },
  {
    name: "Incoming request",
    href: "/dashboard/bookings/owner",
    icon: InboxArrowDownIcon,
  },
  {
    name: "My Bookings",
    href: "/dashboard/bookings/renter",
    icon: CalendarIcon,
  },
];

const adminLinks = [
  {
    name: "Car Verification",
    href: "/dashboard/verify/cars",
    icon: BookOpenIcon,
  },
  {
    name: "Driving Licence Verification",
    href: "/dashboard/verify/drivinglicence",
    icon: BookOpenIcon,
  },
];

export default function Showscase() {
  return (
    <div className="flex-1 relative w-full h-full">
      <img
        alt=""
        src="./cover.jpg"
        className="absolute inset-0 w-full size-full object-cover"
      />
      <div className="flex mb-9 items-center h-full text-base lg:text-5xl md:text-base sm:text-xl text-center justify-center absolute font-bold inset-0 bg-black bg-opacity-60 z-10">
        <div className="mb-9 space-y-7">
          <h1 className="text-white ">RENT A CAR</h1>
          <h1 className="text-gray-900 bg-gray-100 px-6 py-2 rounded-3xl bg-opacity-40  ">
            SHARE YOURS{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
