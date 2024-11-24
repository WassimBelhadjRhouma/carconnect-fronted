import { XCircleIcon } from "@heroicons/react/20/solid";

const ErrorBox = ({ title, errorList }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 w-6/12 mb-7">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            {errorList[0].length > 0 && (
              <ul role="list" className="list-disc space-y-1 pl-5">
                {errorList.map((errorItem, index) => {
                  return <li key={index}>{errorItem}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBox;
