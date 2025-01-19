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
  ClockIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import { USER_STATUS } from "../interfaces/UserInterfaces";

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

export default function Navbar() {
  const [current, setCurrent] = useState("Home");
  const { logout, userName } = useAuth();
  const [viewModal, setViewModal] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const clearModal = () => {
    setViewModal(false);
  };

  const [navLinks, setNavLinks] = useState(navigation);
  const { role, status } = useAuth();

  useEffect(() => {
    if (role === USER_TYPES.ADMIN && !isVisited) {
      setIsVisited(true);
      setNavLinks((oldVal) => {
        return [...navigation, ...adminLinks];
      });
    }
  }, [role, status]);

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
      <ul role="list" className="flex flex-1 flex-col gap-y-9">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navLinks?.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setCurrent(item.name)}
                  className={classNames(
                    current === item.name
                      ? "bg-gray-50 text-darkblue"
                      : "hover:bg-gray-50 ",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      current === item.name
                        ? "text-darkblue"
                        : "text-gray-400 group-hover:text-darkblue",
                      "size-6 shrink-0"
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <div className="text-xs/6 font-bold text-darkblue">
            Hi {userName} !
          </div>
          <ul role="list" className=" mt-2 space-y-1">
            <li className=" items-center flex gap-x-3 text-sm/6 font-semibold">
              {/* For Verified user  */}
              {status == USER_STATUS.ACCEPTED && role != USER_TYPES.ADMIN && (
                <>
                  <div>
                    <CheckBadgeIcon
                      aria-hidden="true"
                      className="size-5 text-green-500"
                    />
                  </div>
                  <span className="font-medium">Verified Profile</span>
                </>
              )}
              {/* For Pending user  */}
              {status == USER_STATUS.PENDING && role != USER_TYPES.ADMIN && (
                <>
                  <div>
                    <ClockIcon
                      aria-hidden="true"
                      className="size-5 text-gray-600"
                    />
                  </div>
                  <span className="font-medium">Under Review</span>
                </>
              )}

              {/* For Unverified user */}
              {status == USER_STATUS.NOTVERIFIED &&
                role != USER_TYPES.ADMIN && (
                  <>
                    <div>
                      <IdentificationIcon
                        aria-hidden="true"
                        onClick={() => setViewModal(true)}
                        className="size-5 cursor-pointer text-purple-700"
                      />
                    </div>
                    <span
                      onClick={() => setViewModal(true)}
                      className="font-medium text-gray-700 underline cursor-pointer"
                    >
                      Verify Your Profile
                    </span>
                  </>
                )}
            </li>
          </ul>
        </li>
        <li onClick={logout} className="-mx-6 mt-auto">
          <a
            href="#"
            className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-black hover:bg-gray-100"
          >
            <div className="flex items-center justify-center  size-8 rounded-full bg-gray-500">
              {/* <span className="text-white">W</span> */}
              <ArrowLeftStartOnRectangleIcon
                aria-hidden="true"
                className="size-5 cursor-pointer text-white"
              />
            </div>
            <span className="sr-only">Your profile</span>
            <span aria-hidden="true">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
