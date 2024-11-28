import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import CarService from "../services/carService";
import Modal from "../components/Modal";

interface IFormInputs {
  title: string;
  description: string;
  pricePerDay: number;
}

interface CarUpdate {
  title: string;
  description: string;
  make: string;
  model: string;
  year: string;
  fuelType: string;
  mileage: string;
  drivingMode: string;
  licencePlate: string;
  pricePerDay: number;
}

export default function UpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState<CarUpdate>();
  const [openModal, setOpenModal] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    CarService.updateCar(id, { ...data })
      .then((res) => {
        setOpenModal(true);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    CarService.getCar(id)
      .then((res) => {
        console.log(res);

        setCar((oldva) => {
          return res.data;
        });
        reset({
          title: res.data.title,
          description: res.data.description,
          pricePerDay: res.data.pricePerDay,
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  // console.log(car.title);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>();

  return (
    <div>
      {openModal && (
        <Modal
          title="Your Data Has Been Updated"
          content="Your updates were successfully saved. Click the button below to return to the listings page."
          textButton={"Done"}
          navigateTo="/dashboard/mylistings"
        />
      )}
      <div>
        <h2
          // ref={targetRefScroll}
          className="px-9 text-balance mb-9 text-3xl font-medium tracking-tight pb-9 sm:text-4xl"
        >
          Update Car{" "}
        </h2>
        <form className="px-9 py-3 bg-slate-50	">
          <div className="space-y-12 grid grid-cols-6 gap-x-6 gap-y-1">
            {/* title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  {...register("title")}
                  placeholder={car?.title || "Loading..."}
                  // defaultValue={car.title}
                  id="title"
                  name="title"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  defaultValue={car?.description}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600"></p>
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
                defaultValue={car?.year}
                id="year"
                name="year"
                type="text"
                disabled
                placeholder={car?.year}
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
                  <span className="text-gray-500 sm:text-sm">€</span>
                </div>
                <input
                  {...register("pricePerDay")}
                  id="price"
                  name="pricePerDay"
                  type="text"
                  defaultValue={car?.pricePerDay}
                  placeholder={car?.pricePerDay + ""}
                  // placeholder="0.00"
                  aria-describedby="price-currency"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    id="price-currency"
                    className="text-gray-500 sm:text-sm"
                  >
                    EUR
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="mt-9 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
