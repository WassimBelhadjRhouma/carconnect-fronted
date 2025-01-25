import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Car } from "../interfaces/CarInterfaces";
import CarService from "../services/carService";
import CarCard from "../components/car/CarCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import LoaderSpinner from "../components/LoaderSpinner";
import { useState } from "react";

export default function Listings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loader, setloader] = useState(true);
  const {
    data: cars,
    isLoading,
    error,
  } = useQuery<Car[]>({
    queryKey: ["myCars"],
    queryFn: () => CarService.getCarByUSerId(),
  });

  const deleteCarMutation = useMutation({
    mutationFn: (carId: number) => CarService.deleteCar(carId),
    onSuccess: (_, carId) => {
      queryClient.setQueryData<Car[]>(["myCars"], (oldCars) =>
        oldCars ? oldCars.filter((car) => car.id !== carId) : []
      );
    },
    onError: (error) => {
      console.error("Error deleting car:", error);
    },
  });
  const deleteCar = (id) => {
    deleteCarMutation.mutate(id);
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My cars
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip?
          </p>
        </div>

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          {isLoading && <LoaderSpinner color="primary" />}
          {error && "this is error"}
          {!isLoading && (
            <div className="-mx-px grid grid-cols-2 gap-6 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
              {cars?.map((car) => (
                <CarCard
                  key={car.id}
                  showButtons={true}
                  deleteCar={deleteCar}
                  car={car}
                />
              ))}
              <div
                onClick={() => navigate("/dashboard/addcar")}
                className=" flex justify-center items-center border-gray-200 shadow-card   sm-6"
              >
                <PlusIcon
                  aria-hidden="true"
                  className={
                    "text-gray-400 hover:text-gray-500 size-70 cursor-pointer "
                  }
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
