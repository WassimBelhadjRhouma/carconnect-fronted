import { useEffect, useState } from "react";

import CarService from "../services/carService";
import Filter from "../components/form/Filter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "../interfaces/CarInterfaces";
import CarCard from "../components/car/CarCard";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import React from "react";

export default function Example() {
  const [selectedFilters, setSelectedFilters] = useState({});

  const { desactivateWelcomeMSG, showWolcome, userName } = useAuth();
  const {
    data: cars,
    isLoading,
    error,
  } = useQuery<Car[]>({
    queryKey: ["availableCars", selectedFilters],
    queryFn: () => CarService.getCars(selectedFilters),
  });

  const notify = () => {
    toast(`Welcome Back ${userName}`, {
      onOpen: () => desactivateWelcomeMSG(),
      pauseOnFocusLoss: false,
    });
  };
  useEffect(() => {
    if (showWolcome) {
      notify();
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <ToastContainer />

      <main className="pb-24">
        <div className="px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Available cars
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip?
          </p>
        </div>

        {/* Filters */}
        <Filter setSelectedFilters={setSelectedFilters} />

        {/* CAR CARDS */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h1 className="font-semibold text-xl text-gray-800 mb-9">
            {cars?.length} Result
          </h1>

          <div className="-mx-px gap-8 grid bg-gray-100 bg-opacity-5 grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {cars?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
