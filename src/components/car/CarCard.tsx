import { Car, CarStatus } from "../../interfaces/CarInterfaces";
import { PencilSquareIcon, StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

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

  return (
    <div
      key={car.id}
      className="group relative rounded-lg border-b border-r border-gray-200 shadow-card "
    >
      {car.verificationStatus === CarStatus.ACCEPTED && (
        <PencilSquareIcon
          onClick={() => navigate(`update/${car.id}`)}
          className="absolute top-5 right-5 cursor-pointer text-gray-200 size-5 hover:text-white "
        />
      )}
      {car.verificationStatus === CarStatus.PENDING && (
        <div className="absolute top-0 left-0 text-center  font-bold  w-full py-4 bg-white bg-opacity-75">
          Under Review
        </div>
      )}
      {car.verificationStatus === CarStatus.REFUSED && (
        <div className="absolute top-0 left-0 text-center  font-bold  w-full py-4 bg-white bg-opacity-75">
          Rejected
        </div>
      )}
      {
        <img
          alt={car.make}
          src={car.images?.length > 0 ? car.images[0] : "./img1.jpg"}
          className={`aspect-square rounded-lg bg-gray-200 object-cover ${
            !showButtons && "group-hover:opacity-75"
          }`}
        />
      }

      <div className="px-4 mb-2">
        <div className="flex py-3 items-center justify-between text-center">
          <span className="text-sm  font-semibold text-gray-900">
            {car.title.length > 20 ? car.title.slice(0, 21) + "..." : car.title}
          </span>
          <span className="font-semibold">€{car.pricePerDay}</span>
        </div>
        <div className="flex space-x-2 my-2 items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={classNames(
                  4 > rating ? "text-yellow-400" : "text-gray-200",
                  "size-4 shrink-0"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">10 reviews</p>
        </div>
      </div>
      <div>
        {showButtons && car.verificationStatus !== CarStatus.REFUSED && (
          <button
            onClick={() => deleteCar(car.id)}
            type="button"
            className=" w-full  bg-white mt-5  rounded-md border border-black bg-gray-600 px-3.5 py-3.5 font-medium shadow-sm hover:bg-primary hover:text-white transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            delete{" "}
          </button>
        )}

        {!showButtons && (
          <button
            onClick={() => navigate(`details/${car.id}`)}
            type="button"
            className="w-full  bg-white mt-5  rounded-md border border-black bg-gray-600 px-3.5 py-3.5 font-medium shadow-sm hover:bg-primary hover:text-white transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Details{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default CarCard;
