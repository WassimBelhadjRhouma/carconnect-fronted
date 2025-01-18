import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoginUserData } from "../interfaces/AuthInterfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonStyles } from "../utils/style/validationFormStyles";
import CustomInput from "../components/form/CustomInput";
import { LoginSchema } from "../schemas/LoginSchema";
import LoaderSpinner from "../components/LoaderSpinner";
import { CustomResponse } from "../utils/ErrorHandler";
import ResponseBox, { statusEnum } from "../components/form/ResponseBox";
import { useAuth } from "../hooks/useAuth";
import Showscase from "../components/Showcase";

const Login: React.FC = () => {
  const { user, login } = useAuth(); // Access values and functions provided by the hook

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<null | CustomResponse>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginUserData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange", // for real-time validation
  });

  const onSubmit = async (data: LoginUserData) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate("/dashboard");
      // setApiResponse({message: "Login successfully", status:200})
    } catch (err) {
      setApiResponse(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full h-screen">
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
                  {apiResponse && (
                    <ResponseBox
                      title={apiResponse.message}
                      buttonContent={
                        apiResponse.status === 200
                          ? {
                              title: "Sign In",
                              onClick: () => navigate("/signin"),
                            }
                          : null
                      }
                      status={
                        apiResponse.status === 200
                          ? statusEnum.Success
                          : statusEnum.Error
                      }
                    />
                  )}
                  <CustomInput
                    labelText="Email Address"
                    disabled={isLoading}
                    register={register}
                    name="email"
                    label="Email Address"
                    type="email"
                    error={errors.email}
                  />
                  <CustomInput
                    labelText="Password"
                    disabled={isLoading}
                    register={register}
                    name="password"
                    label="Password"
                    type="password"
                    error={errors.password}
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
                      {isLoading ? <LoaderSpinner /> : "Sign in"}
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
        <Showscase />
      </div>
    </>
  );
};

export default Login;
