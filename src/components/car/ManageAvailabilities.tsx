import { Car } from "../../interfaces/CarInterfaces";
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CarService from "../../services/carService";
import { DateInterval } from "../../interfaces/BookingInterfaces";
import useBlockedDates from "../../hooks/useBlockedDates";
import Calendar from "../booking/Calendar";

interface ComponentProps {
  carId: number;
}
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];
const ManageAvailabilities: React.FC<ComponentProps> = ({ carId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [customError, setCustomError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    blockedDates,
    isLoading,
    error,
    blockedDatesIntervals,
    removeBlockedDateInterval,
    addBlockedDateInterval,
  } = useBlockedDates(carId);

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleCalendarError = (err) => {
    setCustomError(err);
  };
  const deleteUnavailability = async (unavailability) => {
    // setOpen(false);
    setLoading(true);
    const data = {
      startDate: unavailability.unavailableFrom,
      endDate: unavailability.unavailableFrom,
    };
    CarService.deleteAvailability(unavailability.id, data)
      .then((res) => {
        // setOpen(false);
        removeBlockedDateInterval(unavailability);
      })
      .catch((err) => {
        // setShowError(true);
        setLoading(false);
        console.log(err);
      });
    // handleModal(false);
    // navigate(navigateTo);
  };
  const submitHandler = () => {
    // setLoading(true);
    const data: DateInterval = {
      unavailableFrom: startDate.format("YYYY-MM-DD"),
      unavailableTo: endDate.format("YYYY-MM-DD"),
    };
    CarService.addUnavailableDates(data, carId)
      .then((res) => {
        setStartDate(null);
        setEndDate(null);
        addBlockedDateInterval(res);

        // setOpen(false);
      })
      .catch((err) => {
        // setShowError(true);
        // setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              Availabilities
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Specify the dates during which your car will be unavailable for
              rent, such as vacations, maintenance periods, or other
              commitments.
            </p>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <Calendar
            blockedDates={blockedDates}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            handleCalendarError={handleCalendarError}
          />{" "}
          <div className="mt-4 ">
            <button
              type="button"
              disabled={customError || !startDate || !endDate}
              onClick={submitHandler}
              className={`${
                customError || !startDate || !endDate
                  ? "hover:bg-gray-400 bg-gray-400 focus-visible:outline-gray-400"
                  : ""
              }  block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
            >
              Add Unavailable dates
            </button>
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-2/3 mt-8 py-2 align-middle sm:px-6 lg:px-8">
              {blockedDatesIntervals?.length > 0 && (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3 "
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {blockedDatesIntervals.map((interval, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {interval.unavailableFrom}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {interval.unavailableTo}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          {interval.deletable && (
                            <button
                              onClick={() => deleteUnavailability(interval)}
                            >
                              <TrashIcon
                                aria-hidden="true"
                                className="size-5 text-gray-700  inline-block "
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAvailabilities;
