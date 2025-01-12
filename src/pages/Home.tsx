import { useState } from "react";

import CarService from "../services/carService";
import Filter from "../components/form/Filter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "../interfaces/CarInterfaces";
import CarCard from "../components/car/CarCard";

export default function Example() {
  const [selectedFilters, setSelectedFilters] = useState({});

  const {
    data: cars,
    isLoading,
    error,
  } = useQuery<Car[]>({
    queryKey: ["availableCars", selectedFilters],
    queryFn: () => CarService.getCars(selectedFilters),
  });

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
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
          <h2 id="products-heading">{cars?.length} Result</h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {cars?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
