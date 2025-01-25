import React, { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import classNames from "classnames";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Logo from "../components/Logo";
import CarDetails from "./CarDetails";
import Home from "./Home";
import UpdateCar from "./UpdateCar";
import Navbar from "../components/Navbar";
import Listings from "./Listings";
import OwnerBookings from "./OwnerBookings";
import RenterBookings from "./RenterBookings";
import AddCar from "./AddCar";
import CarOwnershipVerification from "./admin/CarOwnershipVerification";
import DrivingLicenceVerif from "./admin/DrivingLicenceVerif";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo></Logo>
                </div>
                <Navbar />
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 -4">
            <div className="flex h-16 shrink-0 items-center">
              <Logo></Logo>
            </div>
            <Navbar />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <main className="py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addcar" element={<AddCar />} />
              <Route path="details/:id" element={<CarDetails />} />
              <Route path="mylistings" element={<Listings />} />
              <Route path="bookings/owner" element={<OwnerBookings />} />
              <Route path="bookings/renter" element={<RenterBookings />} />
              <Route path="mylistings/update/:id" element={<UpdateCar />} />
              <Route
                path="verify/cars"
                element={<CarOwnershipVerification />}
              />
              <Route
                path="verify/drivinglicence"
                element={<DrivingLicenceVerif />}
              />
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace={true} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
