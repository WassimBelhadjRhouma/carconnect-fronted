import { useForm, SubmitHandler } from "react-hook-form";
import { PhotoIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  carBrands,
  carModels,
  constructionYears,
  drivingModes,
  fuelTypes,
  mileageIntervals,
  selectPhrases,
} from "../constants/CarConstants";
import CarService from "../services/carService";
import Modal from "../components/Modal";
import ResponseBox, { statusEnum } from "../components/form/ResponseBox";
import Checkbox from "../components/form/Checkbox";
import { buttonStyles, inputStyles } from "../utils/style/validationFormStyles";
import { AddCarSchema } from "../schemas/CarSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../components/form/CustomInput";
import { Car } from "../interfaces/CarInterfaces";
import { fileToBase64 } from "../utils/FileTransfer";

interface IFormInputs {
  title: string;
  description: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  pricePerDay: string;
  licencePlate: string;
  frontImage: any;
  backImage: any;
  imageDataList: any[];
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
  const [showError, setShowError] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState(fuelTypes[0]);
  const [selectedBrand, setSelectedBrand] = useState(carBrands[0]);
  const [selectedModel, setSelectedModel] = useState(carModels.bmw[0]);
  const [selectedYear, setSelectedYear] = useState(constructionYears[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [frontImageName, setFrontImageName] = useState(null);
  const [backImageName, setBackImageName] = useState(null);

  const [modelBehavior, setModelBehavior] = useState({
    show: false,
    models: [],
  });
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<IFormInputs>({
    resolver: zodResolver(AddCarSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const backImage = data.backImage;
    const frontImage = data.frontImage;
    delete data.backImage;
    delete data.frontImage;

    const allData: Car = {
      ...data,
      make: selectedBrand.name,
      model: selectedModel.name,
      drivingMode: selectedDrivingMode.name,
      mileage: selectedMileageInterval.name,
      fuelType: selectedFuel.name,
      constructionYear: selectedYear.name,
      ownershipDocuments: [frontImage, backImage],
    };
    const errorsDisplay = {
      show: false,
      errorList: [],
      errorTitle: "",
    };
    if (selectedBrand.name === selectPhrases.make) {
      errorsDisplay.errorList.push("Make is required");
    }
    if (!modelBehavior.show || selectedModel.name == selectPhrases.model) {
      errorsDisplay.errorList.push("Model is required");
    }
    if (!showYear) {
      errorsDisplay.errorList.push("Construction year is required");
    }

    if (errorsDisplay.errorList.length > 0) {
      setErrorDetails({
        ...errorsDisplay,
        errorTitle: "Please Complete All Required Fields",
        show: true,
      });
      targetRefScroll.current.scrollIntoView({ behavior: "smooth" });
      return;
    } else {
      setErrorDetails({
        ...errorsDisplay,
      });
    }

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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Convert files to base64 strings
    Promise.all(files.map(fileToBase64))
      .then((base64Images) => {
        setValue("imageDataList", base64Images, { shouldValidate: true }); // Update the 'images' field in the form
        setPreviewImages(base64Images); // Set preview for display
      })
      .catch((error) => {
        console.error("Error converting images:", error);
      });
  };

  const handleSingleFileChange = (event) => {
    console.log(event.target.name);

    const file = event.target.files[0]; // Get the first file

    if (!file) {
      console.error("No file selected");
      return;
    }

    fileToBase64(file)
      .then((base64Image) => {
        setValue(event.target.name, base64Image, { shouldValidate: true }); // Save the Base64 string for the image
        event.target.name === "frontImage"
          ? setFrontImageName(file.name)
          : setBackImageName(file.name); // Optional: Set the preview image
      })
      .catch((error) => {
        console.error("Error converting the image:", error);
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
          textButton="Back to my listings page"
          title="Car added successfully"
          navigateTo="/dashboard/mylistings"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Our team will now review your listing. We will notify you as soon
              as there are any updates. In the meantime, you can track the
              status of your listings on the 'My Listings' page.
            </p>
          </div>
        </Modal>
      )}
      <h2
        ref={targetRefScroll}
        className="px-9 text-balance mb-9 text-3xl font-medium tracking-tight pb-9 sm:text-4xl"
      >
        Let’s Get Your Car Onboard
      </h2>
      <form className="px-9 py-3 bg-slate-50	">
        {errorDetails.show && (
          <ResponseBox
            status={statusEnum.Error}
            title={errorDetails.errorTitle}
            errorList={errorDetails.errorList}
          />
        )}
        <div className="space-y-12 grid grid-cols-6 gap-x-6 gap-y-1">
          <div className="sm:col-span-2">
            <CustomInput
              labelText="Title"
              disabled={isLoading}
              register={register}
              name="title"
              label="Title"
              type="text"
              error={errors.title}
            />
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
                className={`${
                  errors.description ? inputStyles.error : ""
                } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                defaultValue={""}
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
              Car photos{" "}
              <span
                aria-hidden="true"
                className={`${
                  errors.imageDataList ? "text-red-500" : "text-gray-900"
                }`}
              >
                *
              </span>
            </label>{" "}
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
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs/5 text-gray-600">PNG, JPG up to 10MB</p>
              </div>
            </div>
            {errors.imageDataList && (
              <p id="images-error" className="mt-2 text-sm text-red-600">
                At least one image is required
              </p>
            )}
          </div>
          <div>
            {previewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                style={{ width: "100px", height: "100px", margin: "10px" }}
              />
            ))}
          </div>

          {/* document verification front page */}

          <div className="col-start-1 col-span-3">
            <div className="mt-4 col-start-1 col-span-3 flex space-x-4 text-sm/6 text-gray-600">
              <label
                htmlFor="frontImage"
                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <div className="flex space-x-2 items-center justify-center ">
                  <span>Upload Front Image of Ownership Document * </span>
                  <PaperClipIcon
                    aria-hidden="true"
                    className="size-5 text-gray-800"
                  />{" "}
                </div>
                <input
                  id="frontImage"
                  name="frontImage"
                  type="file"
                  accept="image/*"
                  onChange={handleSingleFileChange}
                  className="sr-only"
                />
              </label>
              <span>{frontImageName}</span>
            </div>
            {errors.frontImage && (
              <p id="images-error" className="mt-2 text-sm text-red-600">
                This document is required
              </p>
            )}
          </div>
          {/*  document verification back page */}
          <div className="col-start-1 col-span-3">
            <div className="mt-4 col-start-1 col-span-3 flex space-x-4 text-sm/6 text-gray-600">
              <label
                htmlFor="backImage"
                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <div className="flex space-x-2 items-center justify-center ">
                  <span>Upload Back Image of Ownership Document * </span>
                  <PaperClipIcon
                    aria-hidden="true"
                    className="size-5 text-gray-800"
                  />{" "}
                </div>
                <input
                  id="backImage"
                  name="backImage"
                  type="file"
                  accept="image/*"
                  onChange={handleSingleFileChange}
                  className="sr-only"
                />
              </label>
              <span>{backImageName}</span>
            </div>
            {errors.backImage && (
              <p id="images-error" className="mt-2 text-sm text-red-600">
                This document is required
              </p>
            )}
          </div>
          {/* licence plate */}
          <div className="col-start-1">
            <CustomInput
              labelText="Licence Plate"
              disabled={isLoading}
              register={register}
              name="licencePlate"
              label="Licence Plate"
              type="text"
              error={errors.licencePlate}
            />
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
            />
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          // disabled={!showYear || !isValid}
          className={`flex justify-center rounded-md  mt-9 mb-3 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonStyles.valid}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
