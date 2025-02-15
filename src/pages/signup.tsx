import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SignUpForm, SignUpUserData } from "../interfaces/AuthInterfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../schemas/SignupSchema";
import { buttonStyles } from "../utils/style/validationFormStyles";
import CustomInput from "../components/form/CustomInput";
import LoaderSpinner from "../components/LoaderSpinner";
import { authService } from "../services/authService";
import { CustomResponse } from "../utils/ErrorHandler";
import ResponseBox, { statusEnum } from "../components/form/ResponseBox";
import Showscase from "../components/Showcase";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<null | CustomResponse>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignUpForm) => {
    setIsLoading(true);
    const dataTransform: SignUpUserData = {
      email: data.email,
      password: data.password,
      firstName: "Wass2",
      lastName: "bhr",
    };

    authService
      .registerUser({ ...dataTransform })
      .then((res) => {
        console.log(res);
        setApiResponse({
          message: "Account created successfully",
          status: 201,
        });
      })
      .catch((err) => {
        setApiResponse(err);
      })
      .finally(() => setIsLoading(false));
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
                  {apiResponse && (
                    <ResponseBox
                      title={apiResponse.message}
                      buttonContent={
                        apiResponse.status === 201
                          ? {
                              title: "Sign In",
                              onClick: () => navigate("/signin"),
                            }
                          : null
                      }
                      status={
                        apiResponse.status === 201
                          ? statusEnum.Success
                          : statusEnum.Error
                      }
                    />
                  )}
                  <CustomInput
                    labelText={"Email Address"}
                    disabled={isLoading}
                    register={register}
                    name="email"
                    label="Email Address"
                    type="email"
                    error={errors.email}
                  />
                  <CustomInput
                    disabled={isLoading}
                    labelText="Password"
                    register={register}
                    name="password"
                    label="password"
                    type="password"
                    error={errors.password}
                  />
                  <CustomInput
                    labelText="Confirm Password"
                    disabled={isLoading}
                    register={register}
                    name="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    error={errors.confirmPassword}
                  />
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
                      {isLoading ? <LoaderSpinner /> : "Sign Up"}
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
        <Showscase />
      </div>
    </>
  );
};

export default SignUp;
