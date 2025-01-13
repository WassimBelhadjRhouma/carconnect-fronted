import classNames from "classnames";
import {
  BookOpenIcon,
  HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AddDucumentModal from "./admin/AddDocumentModal";

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
    icon: BookOpenIcon,
  },
  {
    name: "My Bookings",
    href: "/dashboard/bookings/renter",
    icon: BookOpenIcon,
  },
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

export default function Navbar() {
  const [current, setCurrent] = useState("Home");
  const { logout } = useAuth();
  const [viewModal, setViewModal] = useState(false);

  const clearModal = () => {
    setViewModal(false);
  };

  return (
    <nav className="flex flex-1 flex-col">
      {viewModal && (
        <AddDucumentModal
          viewModal={viewModal}
          clearModal={clearModal}
          title={"Verify Your Account"}
          textButton={"Verify Account"}
          navigateTo={""}
        />
      )}
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setCurrent(item.name)}
                  className={classNames(
                    current === item.name
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      current === item.name
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-indigo-600",
                      "size-6 shrink-0"
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <button onClick={() => setViewModal(true)}> start verif</button>
      <button onClick={logout}>logout</button>
    </nav>
  );
}
