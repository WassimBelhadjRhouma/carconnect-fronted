import React, { useEffect } from "react";
import { useState } from "react";
import AdminService from "../../services/AdminService";
import DownloadButton from "../../components/admin/DownloadButton";
import { LicenceVerification } from "../../interfaces/Verifications";
import dayjs from "dayjs";
import LoaderSpinner from "../../components/LoaderSpinner";

interface MyComponentProps {}

const DrivingLicenceVerif: React.FC<MyComponentProps> = ({}) => {
  const [verifications, setVerifications] = useState<LicenceVerification[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await AdminService.getLicenceRequests();
        setVerifications(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const updateVerification = async (userId, decision) => {
    try {
      const res = AdminService.updateLicence(userId, decision);
      setVerifications((prevVal) =>
        prevVal.map((verification) =>
          verification.userId === userId
            ? { ...verification, verified: true }
            : verification
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Driving Licence Verifications
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Below is a list of driving license verification requests. Please
            review the details carefully and choose to either accept or refuse
            each request based on the provided information.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {isLoading && <LoaderSpinner />}
            {!isLoading && (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Date of Request
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date of birth
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Driving Licence Front Side{" "}
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Driving Licence Back Side{" "}
                    </th>
                    <th
                      scope="col"
                      className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {verifications?.map((verification) => (
                    <tr key={verification.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {dayjs(verification.requestedAt).format("MMMM D, YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {verification.userName}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {verification.birthDate} / birthdate
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        <DownloadButton
                          side={"Front"}
                          base64Image={verification.drivingLicenceFrontPage}
                        />{" "}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        <DownloadButton
                          side={"Back"}
                          base64Image={verification.drivingLicenceBackPage}
                        />
                      </td>
                      <td className="mt-6 items-center  divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-3">
                        {!verification.verified && (
                          <div className="flex items-center space-x-4 divide-x">
                            <div className="flex flex-1 justify-center">
                              <button
                                onClick={() => {
                                  updateVerification(verification.userId, true);
                                }}
                                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                              >
                                Accept
                              </button>
                            </div>
                            <div className="flex flex-1 justify-center pl-4">
                              <button
                                onClick={() => {
                                  updateVerification(
                                    verification.userId,
                                    false
                                  );
                                }}
                                className="whitespace-nowrap text-red-800 hover:text-red-500"
                              >
                                Refuse
                              </button>
                            </div>
                          </div>
                        )}
                        {verification.verified && (
                          <span className="text-gray-400 pl-12">
                            {" "}
                            Reviewed{" "}
                          </span>
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
  );
};

export default DrivingLicenceVerif;
