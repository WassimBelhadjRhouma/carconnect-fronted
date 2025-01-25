import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";

import { SubmitHandler, useForm } from "react-hook-form";
import FilterElement from "./FilterElement";

export interface FilterFormInputs {
  price?: Number[];
  make?: string;
  drivingMode?: string;
  fuelType?: string;
}

const Filter = ({ setSelectedFilters }) => {
  const { register, handleSubmit, reset } = useForm<FilterFormInputs>();

  const clearFilter = () => {
    reset({
      price: null,
      make: null,
      drivingMode: null,
      fuelType: null,
    });
    setSelectedFilters({});
  };
  const onSubmit: SubmitHandler<FilterFormInputs> = (data) => {
    console.log("price:", data.price);
    let price = null;
    if (!!data.price) {
      price = priceInterval(data.price);
    }
    console.log(finalFilters({ ...data, price }));
    setSelectedFilters({ ...data, price });
  };

  const finalFilters = (data): FilterFormInputs => {
    const finalFilter = {};
    for (const key in data) {
      if (data[key]) {
        finalFilter[key] = data[key];
      }
    }
    return finalFilter;
  };

  const priceInterval = (prices: any) => {
    if (!prices) return false;
    console.log(prices.length);

    const largest = Math.max(...prices.map(Number));
    const smallest = Math.min(...prices.map(Number));
    if (smallest === 75 || largest === 75) {
      return { minPrice: Number(smallest) };
    }
    return { minPrice: Number(smallest), maxPrice: Number(largest) + 25 };
  };

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid my-8 items-center border-b border-t border-gray-200"
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
            <FilterElement label="Price" name="price" register={register} />
            <FilterElement label="Make" name="make" register={register} />
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <FilterElement
              label="Driving Mode"
              name="drivingMode"
              register={register}
            />
            <FilterElement
              label="Fuel Type"
              name="fuelType"
              register={register}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          style={{ margin: "2rem 0 0 8rem " }}
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
        >
          Apply Filters
        </button>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Filter;
