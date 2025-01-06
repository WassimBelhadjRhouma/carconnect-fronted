import classNames from "classnames";
import {
  BookOpenIcon,
  HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Listings",
    href: "/dashboard/mylistings",
    icon: PencilSquareIcon,
  },
  {
    name: "My Bookings Requests",
    href: "/dashboard/bookings",
    icon: BookOpenIcon,
  },
  {
    name: "Incoming requests",
    href: "/dashboard/bookings",
    icon: BookOpenIcon,
  },
];

export default function Navbar() {
  const [current, setCurrent] = useState("Home");
  const {logout} = useAuth()

  return (
    <nav className="flex flex-1 flex-col">
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
      <button onClick={logout}>logout</button>
    </nav>
  );
}
