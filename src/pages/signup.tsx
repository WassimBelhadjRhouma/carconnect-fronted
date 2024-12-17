import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService"; // Import API service
import { Link } from "react-router-dom";
import { LoginRequest, LoginResponse, SignUpRequest } from "../types/api";
import axios, { AxiosError } from "axios";
import { watch } from "fs";
import { useForm } from "react-hook-form";
interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "onChange", // Enables real-time validation
  });

  const password = watch("password");

  const handleChange = (event: any) => {};

  // async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   e.preventDefault();

  // const requestData: SignUpRequest = formData;
  // if (!validatePassword(formData.password, formData.confirmPassword)) {
  //   setError("Passwords do not match.");
  //   return;
  // }

  // axios
  //   .post("http://localhost:8080/api/auth/register", {
  //     email: requestData.email,
  //     password: requestData.password,
  //     firstName: "test",
  //     lastName: "test",
  //   })
  //   .then((response) => {
  //     // Navigate to the dashboard
  //     navigate("/signin");
  //   })
  //   .catch((err) => {
  //     console.log(err);

  //     // Handle error
  //     const errorMessage =
  //       err.response?.data?.message || "sign up. Please try again.";
  //     console.error("Error during login:", errorMessage);

  //     // Set error message
  //     setError(errorMessage);
  console.log(errors.email);

  //   });
  const onSubmit = (data: IFormInputs) => {
    console.log("Form Data:", data);

    axios
      .post("https://localhost:8443/api/auth/register", {
        email: data.email,
        password: data.password,
        firstName: "test",
        lastName: "test",
      })
      .then((response) => {
        // Navigate to the dashboard
        navigate("/dashboard/bookings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <p className="flex logo">CarConnect.</p>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
                Ready to drive or share?{" "}
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">Sign up now!</p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* <p className="text-red-500">{error}</p> */}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        aria-describedby="email-error"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className={`${
                          errors.email
                            ? "text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
                            : "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        }col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base `}
                      />

                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          Not a valid email address.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`${
                          errors.password
                            ? "text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
                            : "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        }col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base `}
                      />
                      {errors.password && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === password || "Passwords do not match",
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`${
                          errors.confirmPassword
                            ? "text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
                            : "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        }col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base `}
                      />
                      {errors.confirmPassword && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-600"
                        >
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`flex w-full justify-center rounded-md  mt-9 mb-3 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isValid
                          ? "hover:bg-indigo-500 bg-indigo-600 focus-visible:outline-indigo-600"
                          : "hover:bg-indigo-400 bg-indigo-400 focus-visible:outline-indigo-400"
                      }`}
                    >
                      Sign up
                    </button>
                    <p className="mt-2 text-sm/6 text-gray-500">
                      Already have an account?{" "}
                      <Link
                        to="/signin"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://plus.unsplash.com/premium_photo-1681965893732-0c6bf9f0841e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
