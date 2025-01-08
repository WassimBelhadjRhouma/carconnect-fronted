import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from "@headlessui/react";
  import { FunnelIcon, StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { filters, priceLabels } from "../constants/FilterConstants";
import CarService from "../services/carService";

const Filter = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        make: "",
        drivingMode: "",
        price: [],
        fuelType: "",
      }); 

  const navigate = useNavigate();
  const clearFilter = () => {
    setSelectedFilters({
      make: "",
      drivingMode: "",
      price: [],
      fuelType: "",
    });
    // CarService.getCars({})
    //   .then((res) => {
    //     setCars(res.data);
    //   })
    //   .catch((err) => setError(err.message));
  };
  
    const handleFilterChange = (event: any) => {
      setSelectedFilters((oldVals) => {
        let newFilterPart;
        if (event.target.type !== "radio") {
          newFilterPart = [...oldVals[event.target.name]];
          if (event.target.checked) {
            newFilterPart.push(event.target.value);
          } else {
            newFilterPart = newFilterPart.filter(
              (el) => el !== event.target.value
            );
          }
          return { ...oldVals, [event.target.name]: newFilterPart };
        } else {
          return { ...oldVals, [event.target.name]: event.target.value };
        }
      });
    };
  
    const priceIntervalDetector = (prices: any[]) => {
      if (prices.length === 0) return {};
      let newPricesArr = [];
  
      prices.forEach((el) => {
        switch (el) {
          case priceLabels.level1:
            newPricesArr.push(0, 25);
            break;
          case priceLabels.level2:
            newPricesArr.push(25);
            break;
          case priceLabels.level3:
            newPricesArr.push(50);
            break;
          case priceLabels.level4:
            newPricesArr.push(75.01);
            break;
        }
      });
      const largest = Math.max(...newPricesArr);
      const smallest = Math.min(...newPricesArr);
      if (smallest === 75.01 || largest === 75.01) {
        return { minPrice: smallest };
      }
      return { minPrice: smallest, maxPrice: largest + 25 };
    };
  
    const appyFilterHandler = () => {
      const finalFilters = {};
      for (const key in selectedFilters) {
        console.log(selectedFilters[key]);
        if (selectedFilters[key].length > 0 && key !== "price") {
          finalFilters[key] = selectedFilters[key];
        }
      }
  
      const prices = priceIntervalDetector(selectedFilters.price);
      // const prices = priceIntervalDetector(selectedFilters.price);
  
    //   CarService.getCars({ ...prices, ...finalFilters })
    //     .then((res) => {
    //       setCars(res.data);
    //     })
    //     .catch((err) => setError(err.message));
    };
  
  
  return (
    <Disclosure
    as="section"
    aria-labelledby="filter-heading"
    className="grid items-center border-b border-t border-gray-200"
  >
    <h2 id="filter-heading" className="sr-only">
      Filters
    </h2>
    <div className="relative col-start-1 row-start-1 py-4">
      <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
        <div>
          <DisclosureButton className="group flex items-center font-medium text-gray-700">
            <FunnelIcon
              aria-hidden="true"
              className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500"
            />
            {/* 2 Filters */}
          </DisclosureButton>
        </div>
        <div className="pl-6">
          <button
            onClick={clearFilter}
            type="button"
            className="text-gray-500"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
    <DisclosurePanel className="border-t border-gray-200 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
          <fieldset>
            <legend className="block font-medium">Price</legend>
            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
              {filters.price.map((option, optionIdx) => (
                <div
                  key={option.value}
                  className="flex items-center text-base sm:text-sm"
                >
                  <input
                    defaultValue={option.label}
                    id={`price-${optionIdx}`}
                    checked={selectedFilters.price.includes(option.label)}
                    name="price"
                    type="checkbox"
                    className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={handleFilterChange}
                  />
                  <label
                    htmlFor={`price-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="block font-medium">make</legend>
            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
              {filters.make.map((option, optionIdx) => (
                <div
                  key={option.value}
                  className="flex items-center text-base sm:text-sm"
                >
                  <input
                    defaultValue={option.value}
                    id={`make-${optionIdx}`}
                    checked={option.value === selectedFilters.make}
                    name="make"
                    type="radio"
                    className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={handleFilterChange}
                  />
                  <label
                    htmlFor={`make-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
          <fieldset>
            <legend className="block font-medium">Driving Mode</legend>
            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
              {filters.drivingMode.map((option, optionIdx) => (
                <div
                  key={option.value}
                  className="flex items-center text-base sm:text-sm"
                >
                  <input
                    defaultValue={option.value}
                    id={`drivingMode-${optionIdx}`}
                    checked={option.value === selectedFilters.drivingMode}
                    name="drivingMode"
                    type="radio"
                    className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={handleFilterChange}
                  />
                  <label
                    htmlFor={`drivingMode-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="block font-medium">Fuel Type</legend>
            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
              {filters.fuelType.map((option, optionIdx) => (
                <div
                  key={option.value}
                  className="flex items-center text-base sm:text-sm"
                >
                  <input
                    defaultValue={option.value}
                    id={`fuelType-${optionIdx}`}
                    checked={option.value === selectedFilters.fuelType}
                    name="fuelType"
                    type="radio"
                    className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={handleFilterChange}
                  />
                  <label
                    htmlFor={`fuelType-${optionIdx}`}
                    className="ml-3 min-w-0 flex-1 text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <button
        onClick={appyFilterHandler}
        style={{ margin: "2rem 0 0 8rem " }}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Apply Filters
      </button>
    </DisclosurePanel>
  </Disclosure>
  );
};

export default Filter;
