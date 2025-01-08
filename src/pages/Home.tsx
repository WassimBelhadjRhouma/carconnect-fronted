import { useEffect, useState } from "react";
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
import Filter from "../components/Filter";

export default function Example() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    CarService.getCars({})
      .then((res) => {
        console.log(res);

        setCars(res);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Available cars
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip?
          </p>
        </div>

        {/* Filters */}
        <Filter />

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {cars.map((product) => (
              <div
                key={product.id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <img
                  alt={"img"}
                  src="/img1.jpg"
                  className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link to={`details/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">4 out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            4 > rating ? "text-yellow-400" : "text-gray-200",
                            "size-5 shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">10 reviews</p>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
