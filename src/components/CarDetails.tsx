import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import CarService from "../services/carService";
import classNames from "classnames";

const images = [
  {
    src: "/img1.jpg",
    alt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    src: "/img2.jpg",
    alt: "Model wearing plain black basic tee.",
  },
  {
    src: "/img3.jpg",
    alt: "Model wearing plain gray basic tee.",
  },
  {
    src: "/img4.jpg",
    alt: "Model wearing plain white basic tee.",
  },
];

const reviews = { href: "#", average: 4, totalCount: 117 };

interface CarDetails {
  title: string;
  description: string;
  make: string;
  model: string;
  year: string;
  fuelType: string;
  mileage: string;
  drivingMode: string;
  licencePlate: string;
  streetAddress: string;
  postalCode: number;
  city: string;
  highlights: string[];
  pricePerDay: number;
}

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<CarDetails>();

  useEffect(() => {
    CarService.getCar(id)
      .then((res) => {
        const highlights = [
          `Make: ${res.data.make}`,
          `Mode: ${res.data.model} ${res.data.year}`,
          `Fuel Type: ${res.data.fuelType}`,
          `Driving Mode ${res.data.drivingMode}`,
          `Mileage ${res.data.mileage}`,
        ];
        setCar({ ...res.data, highlights });
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={"img"}
            src={images[0].src}
            className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={images[1].alt}
              src={images[1].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <img
              alt={images[2].alt}
              src={images[2].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={images[3].alt}
            src={images[3].src}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {car?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {car?.pricePerDay}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Reserve
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{car?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {car?.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Pick up location: {car?.streetAddress}, {car?.postalCode}{" "}
                  {car?.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
