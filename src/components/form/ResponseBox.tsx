import { XCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export enum statusEnum {
  Error = "error",
  Success = "success",
}

type ButtonContent = {
  title: string;
  onClick: () => void;
};

interface ComponentProps {
  title: string;
  errorList?: string[];
  status: statusEnum;
  buttonContent?: ButtonContent;
}

const ResponseBox: React.FC<ComponentProps> = ({
  title,
  errorList = null,
  status,
  buttonContent = null,
}) => {
  const color = status === statusEnum.Error ? "red" : "green";
  return (
    <div
      className={`rounded-md  ${
        status === statusEnum.Error ? "bg-red-50" : "bg-green-50"
      } p-4`}
    >
      <div className={"flex"}>
        <div className={"shrink-0"}>
          {status === "error" ? (
            <XCircleIcon aria-hidden="true" className={`size-5 text-red-400`} />
          ) : (
            <CheckCircleIcon
              aria-hidden="true"
              className={`size-5 text-green-400`}
            />
          )}
        </div>
        <div className={"ml-3"}>
          <h3
            className={`text-sm font-medium ${
              status === statusEnum.Error ? "text-red-800" : "text-green-800"
            } `}
          >
            {title}
          </h3>
          <div
            className={`mt-2 text-sm ${
              status === statusEnum.Error ? "text-red-700" : "text-green-700"
            }`}
          >
            {errorList && (
              <ul role="list" className={"list-disc space-y-1 pl-5"}>
                {errorList.map((errorItem, index) => {
                  return <li key={index}>{errorItem}</li>;
                })}
              </ul>
            )}
          </div>
          {buttonContent && (
            <div className={"mt-4"}>
              <div className={"-mx-2 -my-1.5 flex"}>
                <button
                  type="button"
                  onClick={buttonContent.onClick}
                  className={`rounded-md ${
                    status === statusEnum.Error ? "bg-red-50" : "bg-green-50"
                  } px-2 py-1.5 text-sm font-medium ${
                    status === statusEnum.Error
                      ? "text-red-800"
                      : "text-green-800"
                  } ${
                    status === statusEnum.Error
                      ? "hover:bg-red-100"
                      : "hover:bg-green-100"
                  } focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2 focus:ring-offset-${color}-50`}
                >
                  {buttonContent.title}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseBox;
