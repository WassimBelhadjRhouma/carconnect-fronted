import { Car, CarStatus } from "../../interfaces/CarInterfaces";
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

interface ComponentProps {
  car: Car;
  showButtons?: Boolean;
  deleteCar?: (id) => void;
}

const CarCard: React.FC<ComponentProps> = ({
  car,
  showButtons = false,
  deleteCar,
}) => {
  const navigate = useNavigate();
  console.log(car);

  // const color = 'red'
  return (
    <div
      key={car.id}
      className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
    >
      {
        <img
          alt={car.make}
          src={car.images?.length > 0 ? car.images[0] : "./img1.jpg"}
          className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
        />
      }

      <div className="pb-4 pt-10 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          {!showButtons && (
            <Link to={`details/${car.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
            </Link>
          )}
          {car.title}
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
          {car.pricePerDay}
        </p>
        {/* Delete and update buttons */}
        {showButtons &&
          car.verificationStatus != CarStatus.PENDING &&
          car.verificationStatus != CarStatus.REFUSED && (
            <div>
              <button
                onClick={() => navigate(`update/${car.id}`)}
                type="button"
                className="inline-flex mt-3 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit{" "}
              </button>
              <button
                onClick={() => deleteCar(car.id)}
                type="button"
                className="inline-flex  bg-[#c7c1c3] ml-4 mt-3 items-center gap-x-2 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                delete{" "}
              </button>
            </div>
          )}

        {car.verificationStatus === CarStatus.PENDING && (
          <div>
            <p className="inline-flex mt-3 items-center gap-x-2 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              Under Review{" "}
            </p>
            <button
              onClick={() => deleteCar(car.id)}
              type="button"
              className="inline-flex  bg-[#c7c1c3] ml-4 mt-3 items-center gap-x-2 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              delete{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
