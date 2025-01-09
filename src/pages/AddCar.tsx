import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Checkbox from "../components/form/Checkbox";
import {
  carBrands,
  carModels,
  constructionYears,
  drivingModes,
  fuelTypes,
  mileageIntervals,
} from "../constants/CarConstants";
import CarService from "../services/carService";
import Modal from "../components/Modal";
import ErrorBox, { statusEnum } from "../components/form/ResponseBox";
import { title } from "process";

// register: Registers input fields and connects them to React Hook Form.
// formState.errors: Stores validation errors for each field.
// handleSubmit: Handles the form submission process and validates inputs before passing the data to the submission handler.
// SubmitHandler<IFormInputs>:
// The SubmitHandler type defines the shape of the data object passed to the onSubmit function.
// IFormInputs specifies the structure of the form data

// register connects the firstName and lastName input fields to React Hook Form. It tracks their values and validates them based on the provided rules (e.g., { required: true }).
// The handleSubmit function from useForm ensures that onSubmit receives the data object containing all the form values.

interface IFormInputs {
  title: string;
  description: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  pricePerDay: number;
  licencePlate: string;
}

export default function App() {
  const navigate = useNavigate();
  const targetRefScroll = useRef<HTMLDivElement>(null);

  const [selectedDrivingMode, setSelectedDrivingMode] = useState(
    drivingModes[0]
  );
  const [viewModal, setViewModal] = useState(false);
  const [selectedMileageInterval, setSelectedMileageInterval] = useState(
    mileageIntervals[0]
  );
  const [errorDetails, setErrorDetails] = useState({
    show: false,
    errorList: [],
    errorTitle: "",
  });
  const [selectedFuel, setSelectedFuel] = useState(fuelTypes[0]);
  const [selectedBrand, setSelectedBrand] = useState(carBrands[0]);
  const [selectedModel, setSelectedModel] = useState(carModels.bmw[0]);
  const [selectedYear, setSelectedYear] = useState(constructionYears[0]);
  const [showYear, setShowYear] = useState(false);
  const [modelBehavior, setModelBehavior] = useState({
    show: false,
    models: [],
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const allData = {
      ...data,
      make: selectedBrand.name,
      model: selectedModel.name,
      drivingMode: selectedDrivingMode.name,
      mileage: selectedMileageInterval.name,
      fuelType: selectedFuel.name,
      year: selectedYear.name,
    };
    console.log();
    CarService.addCar(allData)
      .then((res) => {
        if (res.status == 200) setViewModal(true);
      })
      .catch((err) => {
        if (err.status == 500) {
          setErrorDetails((oldVal) => {
            return {
              show: true,
              errorList: [""],
              errorTitle: "Server connection problem",
            };
          });
          targetRefScroll.current.scrollIntoView({ behavior: "smooth" });
        }
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedBrand.name !== "Select a brand") {
      const currentModels = carModels[selectedBrand.name.toLowerCase()];
      setModelBehavior({ show: true, models: currentModels });
      setSelectedModel(currentModels[0]);
    } else {
      if (modelBehavior.show) {
        setModelBehavior({ show: false, models: [] });
        setSelectedModel({ name: "Select a model", id: 0 });
      }
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel.name !== "Select a model") {
      setShowYear(true);
      console.log("yowyowyoww");
    } else {
      setShowYear(false);
    }
  }, [selectedModel]);

  return (
    <div className="">
      {viewModal && (
        <Modal
          textButton="Done"
          title="Car added successfully"
          content="Our team will now review your listing. We will notify you as soon as there are any updates. In the meantime, you can track the status of your listings on the 'My Listings' page."
          navigateTo="/dashboard/mylistings"
        />
      )}
      <h2
        ref={targetRefScroll}
        className="px-9 text-balance mb-9 text-3xl font-medium tracking-tight pb-9 sm:text-4xl"
      >
        Let’s Get Your Car Onboard
      </h2>
      <form className="px-9 py-3 bg-slate-50	">
        {errorDetails.show && (
          <ErrorBox
            status={statusEnum.Error}
            title={errorDetails.errorTitle}
            errorList={errorDetails.errorList}
          />
        )}
        <div className="space-y-12 grid grid-cols-6 gap-x-6 gap-y-1">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                {...register("title", { required: true })}
                id="title"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            <div></div>
          </div>

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
                defaultValue={""}
              />
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Write a few sentences about your car.
            </p>
          </div>

          {/* make  */}
          <div className="col-start-1">
            <Checkbox
              label={"Make"}
              changeHandler={setSelectedBrand}
              selectedOption={selectedBrand}
              options={carBrands}
            />
          </div>

          {/* Model */}
          {modelBehavior.show && (
            <div className="row-start-3 col-start-2">
              <Checkbox
                label={"Model"}
                changeHandler={setSelectedModel}
                selectedOption={selectedModel}
                options={modelBehavior.models}
              />
            </div>
          )}

          {/* Construction year */}
          {showYear && (
            <div className="row-start-3 col-start-3">
              <Checkbox
                label={"Construction year"}
                changeHandler={setSelectedYear}
                selectedOption={selectedYear}
                options={constructionYears}
              />
            </div>
          )}

          {/* //  driving mode */}
          <div className="row-start-4">
            <Checkbox
              label={"Driving mode"}
              changeHandler={setSelectedDrivingMode}
              selectedOption={selectedDrivingMode}
              options={drivingModes}
            />
          </div>

          {/* //  Mileage */}
          <div className="row-start-4">
            <Checkbox
              label={"Mileage"}
              changeHandler={setSelectedMileageInterval}
              selectedOption={selectedMileageInterval}
              options={mileageIntervals}
            />
          </div>

          {/* //  Fuel Type */}
          <div className="row-start-4">
            <Checkbox
              label={"Fuel Type"}
              changeHandler={setSelectedFuel}
              selectedOption={selectedFuel}
              options={fuelTypes}
            />
          </div>

          {/* photos */}
          <div className="col-start-1 col-span-3">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Car photos
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
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
                {...register("licencePlate", { required: true })}
                id="licencePlate"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                placeholder="0.00"
                aria-describedby="price-currency"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span id="price-currency" className="text-gray-500 sm:text-sm">
                  EUR
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-1 col-span-2">
            <label
              htmlFor="street-address"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                {...register("streetAddress")}
                id="street-address"
                name="streetAddress"
                type="text"
                autoComplete="address-line1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* City */}
          <div className="col-start-1">
            <label
              htmlFor="city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                {...register("city")}
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="postal-code"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                {...register("postalCode")}
                id="postal-code"
                name="postalCode"
                type="text"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
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
  );
}
