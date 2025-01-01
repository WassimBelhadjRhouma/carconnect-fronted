import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {LoginRequest } from "../types/api";
import { useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonStyles } from "../utils/style/validationFormStyles";
import AuthenticationInput from "../components/AuthenticationInput";
import { LoginSchema } from "../utils/validation/LoginSchema";
import LoaderSpinner from "../components/LoaderSpinner";

const SignIn: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange", // for real-time validation
  });

  const onSubmit = (data: LoginRequest) => {
    setIsLoading(true)
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <p className="flex logo">CarConnect.</p>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
                Hi there!
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Welcome to your carconnect
              </p>
            </div>
            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthenticationInput disabled={isLoading} register={register} name="email" label="Email Address" type="email" error={errors.email}/>
                <AuthenticationInput disabled={isLoading} register={register} name="password" label="Password" type="password" error={errors.password}/>

                  <div>
                    <button
                      type="submit"
                      disabled={!isValid || isLoading}
                      className={` ${buttonStyles.base} ${
                        !isValid || isLoading
                          ? buttonStyles.invalid
                          : buttonStyles.valid
                      }`}
                    >
                      {isLoading? <LoaderSpinner /> : 'Sign in'}
                    </button>

                    <p className="mt-2 text-sm/6 text-gray-500">
                      Don’t have an account?{" "}
                      <Link
                        to="/signup"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        sign up
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
