import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CarService from "../services/carService";
import Modal from "../components/Modal";
import { Car } from "../interfaces/CarInterfaces";
import CustomInput from "../components/form/CustomInput";
import { inputStyles } from "../utils/style/validationFormStyles";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCarSchema } from "../schemas/CarSchema";
import ManageAvailabilities from "../components/car/ManageAvailabilities";

interface IFormInputs {
  title: string;
  description: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  pricePerDay: string;
}

export default function UpdateCar() {
  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const {
    data: car,
    isLoading,
    error,
  } = useQuery<Car>({
    queryKey: ["myCar", id],
    queryFn: () => CarService.getCar(id),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormInputs>({
    resolver: zodResolver(UpdateCarSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      city: "",
      streetAddress: "",
      postalCode: "",
      pricePerDay: "",
    },
  });

  useEffect(() => {
    console.log(car);

    if (car) {
      reset({
        title: car.title || "",
        description: car.description || "",
        city: car.city || "",
        streetAddress: car.streetAddress || "",
        postalCode: car.postalCode || "",
        pricePerDay: car.pricePerDay.toString() || "",
      });
    }
  }, [car, reset]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    CarService.updateCar(id, { ...data })
      .then((res) => {
        setOpenModal(true);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {openModal && (
        <Modal
          title="Your Data Has Been Updated"
          textButton={"Done"}
          navigateTo="/dashboard/mylistings"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Your updates were successfully saved. Click the button below to
              return to the listings page.
            </p>
          </div>
        </Modal>
      )}
      <div>
        <h2 className="px-9 text-balance mb-9 text-3xl font-medium tracking-tight pb-9 sm:text-4xl">
          Update Car{" "}
        </h2>
        <form className="px-9 py-3 bg-slate-50	">
          <div className="space-y-12 grid grid-cols-6 gap-x-6 gap-y-1">
            {/* title */}
            <div className="col-start-1 col-span-2">
              <CustomInput
                labelText="Title "
                disabled={isLoading}
                register={register}
                name="title"
                label="title"
                type="text"
                error={errors.title}
                defaultValue={car?.title}
              />
            </div>

            {/* description */}
            <div className="col-span-3 col-start-1">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description")}
                  id="about"
                  name="description"
                  rows={3}
                  className={`${
                    errors.description ? inputStyles.error : ""
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                  defaultValue={car?.description}
                />
              </div>
              <p
                className={`mt-3 text-sm/6 ${
                  errors.description ? "text-red-600" : "text-gray-600"
                }`}
              >
                Write a few sentences about your car.
              </p>
            </div>
            {/* make  */}
            <div className="col-start-1">
              <label
                htmlFor="make"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Make
              </label>
              <input
                defaultValue={car?.make}
                id="make"
                name="make"
                type="text"
                disabled
                placeholder={car?.make}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* Model */}
            <div className="row-start-3 col-start-2">
              {" "}
              <label
                htmlFor="model"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Model
              </label>
              <input
                defaultValue={car?.model}
                id="model"
                name="model"
                type="text"
                disabled
                placeholder={car?.model}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* Construction year */}
            <div className="row-start-3 col-start-3">
              {" "}
              <label
                htmlFor="year"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Constriction Year
              </label>
              <input
                defaultValue={car?.constructionYear}
                id="year"
                name="year"
                type="text"
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* //  driving mode */}
            <div className="row-start-4">
              <label
                htmlFor="drivingMode"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Driving Mode
              </label>
              <input
                defaultValue={car?.drivingMode}
                id="drivingMode"
                name="drivingMode"
                type="text"
                disabled
                placeholder={car?.drivingMode}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* //  Mileage */}
            <div className="row-start-4">
              <label
                htmlFor="mileage"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Mileage
              </label>
              <input
                defaultValue={car?.mileage}
                id="mileage"
                name="mileage"
                type="text"
                disabled
                placeholder={car?.mileage}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* //  Fuel Type */}
            <div className="row-start-4">
              <label
                htmlFor="fuelType"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Fuel Type
              </label>
              <input
                defaultValue={car?.fuelType}
                id="fuelType"
                name="fuelType"
                type="text"
                disabled
                placeholder={car?.fuelType}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
              />
            </div>

            {/* licence plate */}
            <div className="col-start-1">
              <label
                htmlFor="licencePlate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Licence plate
              </label>
              <div className="mt-2">
                <input
                  defaultValue={car?.licencePlate}
                  id="licencePlate"
                  name="licencePlate"
                  type="text"
                  disabled
                  placeholder={car?.licencePlate}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm/6"
                />
              </div>
              <div></div>
            </div>

            {/* price */}
            <div className="col-start-1">
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span
                    id="price-currency"
                    className={`${
                      errors.pricePerDay ? "text-red-500" : "text-gray-500"
                    }  sm:text-sm`}
                  >
                    €
                  </span>
                </div>
                <input
                  {...register("pricePerDay")}
                  id="price"
                  name="pricePerDay"
                  type="text"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  className={`${
                    errors.pricePerDay ? inputStyles.error : ""
                  }   block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    id="price-currency"
                    className={`${
                      errors.pricePerDay ? "text-red-500" : "text-gray-500"
                    }  sm:text-sm`}
                  >
                    EUR
                  </span>
                </div>
              </div>
              {errors.pricePerDay && (
                <p id="price-error" className="mt-2 text-sm text-red-600">
                  {errors.pricePerDay.message}
                </p>
              )}
            </div>
            <div className="col-start-1 col-span-2">
              <CustomInput
                labelText="Street Address"
                disabled={isLoading}
                register={register}
                name="streetAddress"
                label="streetAddress"
                type="text"
                error={errors.streetAddress}
                autoComplete="address-line1"
                defaultValue={car?.streetAddress}
              />
            </div>
            {/* City */}
            <div className="col-start-1">
              <CustomInput
                labelText="City"
                disabled={isLoading}
                register={register}
                name="city"
                label="city"
                type="text"
                error={errors.city}
                autoComplete="address-level2"
                defaultValue={car?.city}
              />
            </div>
            <div className="">
              <CustomInput
                labelText="Postal Code"
                disabled={isLoading}
                register={register}
                name="postalCode"
                label="postalCode"
                type="text"
                error={errors.postalCode}
                autoComplete="postal-code"
                defaultValue={car?.postalCode}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="mt-9 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Update calendat */}
      <div className="px-9 py-3 bg-slate-50 mt-14	">
        <ManageAvailabilities carId={car?.id} />
      </div>
    </div>
  );
}
