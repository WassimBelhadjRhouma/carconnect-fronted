import { useEffect, useState } from "react";
import { StarIcon, PlusIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import CarService from "../services/carService";

export default function Listings() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    CarService.getCars({})
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const deleteCar = (id) => {
    CarService.deleteCar(id)
      .then((res) => {
        if (res.status === 204) {
          setCars((oldVal) => {
            const newVal = oldVal.filter((el) => el.id != id);
            return newVal;
          });
          console.log(cars);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My cars
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip?
          </p>
        </div>

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
                  className="aspect-square rounded-lg bg-gray-200 object-cover cursor-pointer hover:opacity-70"
                />
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute" />
                      {product.title}
                    </a>
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
                    <p className="mt-1 text-sm text-gray-500">2 reviews</p>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {product.price}
                  </p>
                  <button
                    onClick={() => navigate(`update/${product.id}`)}
                    type="button"
                    className="inline-flex mt-3 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit{" "}
                  </button>
                  <button
                    onClick={() => deleteCar(product.id)}
                    type="button"
                    className="inline-flex  bg-[#c7c1c3] ml-4 mt-3 items-center gap-x-2 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    delete{" "}
                  </button>
                </div>
              </div>
            ))}
            <div
              onClick={() => navigate("/dashboard/addcar")}
              className="group relative border-b border-r flex justify-center border-gray-200 p-4 sm:p-6"
            >
              <PlusIcon
                // key={rating}
                aria-hidden="true"
                className={"text-gray-400 size-100 cursor-pointer "}
              />
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900"></h3>
                <div className="mt-3 flex flex-col items-center"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
