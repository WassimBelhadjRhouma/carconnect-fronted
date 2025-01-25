import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { Review } from "../../interfaces/ReviewInterfaces";
import { fileToBase64 } from "../../utils/FileTransfer";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LicenceVerification } from "../../interfaces/Verifications";
import { VerifyLicenceSchema } from "../../schemas/VerifyLicenceSchema";
import LoaderSpinner from "../LoaderSpinner";
import UserService from "../../services/UserService";
import { useAuth } from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../CustomToast";
import { buttonStyles } from "../../utils/style/validationFormStyles";

interface MyComponentProps {
  title: string;
  textButton: string;
  navigateTo?: string;
  viewModal: boolean;
  clearModal: any;
}

const AddDucumentModal: React.FC<MyComponentProps> = ({
  title,
  textButton,
  viewModal,
  clearModal,
}) => {
  const { updateStatus } = useAuth();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [frontImageName, setFrontImageName] = useState(null);
  const [backImageName, setBackImageName] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<LicenceVerification>({
    resolver: zodResolver(VerifyLicenceSchema),
    mode: "onTouched",
  });

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
        event.target.name === "drivingLicenceFrontPage"
          ? setFrontImageName(file.name)
          : setBackImageName(file.name); // Optional: Set the preview image
      })
      .catch((error) => {
        console.error("Error converting the image:", error);
      });
  };
  console.log(frontImageName);

  const notifyError = () => {
    toast.error(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Netweork error!",
        content: "Something went wrong",
      },
      ariaLabel: "Something went wrong",
      onClose: () => modalHandler(),
    });
  };
  const notifySuccess = () => {
    toast(CustomToast, {
      position: "bottom-right",

      data: {
        title: "Documents Submitted Successfully!",
        content:
          "Our team is reviewing your documents and will get back to you shortly.",
      },
      ariaLabel:
        "Our team is reviewing your documents and will get back to you shortly.",
      onClose: () => {
        modalHandler();
      },
    });
  };
  const modalHandler = () => {
    updateStatus();
    setOpen(false);
    clearModal();
    // navigate(navigateTo);
  };
  const onSubmit: SubmitHandler<LicenceVerification> = async (data) => {
    setIsLoading(true);
    try {
      const response = await UserService.addDrivingLicenceRequest(data);
      setRequestSent(true);
      notifySuccess();
      setIsSuccess(true);
    } catch (error) {
      notifyError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, [viewModal]);

  return (
    <Dialog
      open={open}
      onClose={() => modalHandler()}
      className="relative z-10"
    >
      <ToastContainer />

      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>
              </div>
              <div className="my-4">
                <p className="text-sm text-gray-500">
                  To verify your account, please upload a valid driving license.
                  Note that only driving licenses issued more than one year ago
                  are accepted.{" "}
                </p>
              </div>
              <h1 className=" text-sm/6 font-semibold text-black-900">
                Upload Driving Licence :
              </h1>
              <div className="col-start-1 col-span-3">
                <div className="mt-4 col-start-1 col-span-3 flex space-x-4 text-sm/6 text-gray-600">
                  <label
                    htmlFor="drivingLicenceFrontPage"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <div className="flex space-x-2 items-center justify-center ">
                      <span>Front Side of Driving Licence *</span>
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-4 text-gray-800"
                      />{" "}
                    </div>
                    <input
                      id="drivingLicenceFrontPage"
                      name="drivingLicenceFrontPage"
                      type="file"
                      accept="image/*"
                      onChange={handleSingleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <span>{frontImageName}</span>
                </div>
                {errors.drivingLicenceFrontPage && (
                  <p id="images-error" className="mt-2 text-sm text-red-600">
                    This document is required
                  </p>
                )}
              </div>
              <div className="col-start-1 col-span-3">
                <div className="mt-4 col-start-1 col-span-3 flex space-x-4 text-sm/6 text-gray-600">
                  <label
                    htmlFor="drivingLicenceBackPage"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <div className="flex space-x-2 items-center justify-center ">
                      <span>Back Side of Driving Licence *</span>
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-4 text-gray-800"
                      />{" "}
                    </div>
                    <input
                      id="drivingLicenceBackPage"
                      name="drivingLicenceBackPage"
                      type="file"
                      accept="image/*"
                      onChange={handleSingleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <span>{backImageName}</span>
                </div>
                {errors.drivingLicenceBackPage && (
                  <p id="images-error" className="mt-2 text-sm text-red-600">
                    This document is required
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                disabled={requestSent}
                onClick={handleSubmit(onSubmit)}
                className={` ${buttonStyles.base} ${
                  requestSent ? buttonStyles.invalid : buttonStyles.valid
                }`}
              >
                {isLoading ? <LoaderSpinner color="white" /> : textButton}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddDucumentModal;
