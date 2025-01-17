import { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";
import { Review } from "../interfaces/ReviewInterfaces";
import {
  LicenceVerification,
  OwnershipVerification,
} from "../interfaces/Verifications";

const pathURL = "/users";

const UserService = {
  addDrivingLicenceRequest: async (
    data: LicenceVerification
  ): Promise<AxiosResponse<any>> => {
    try {
      const res = await ApiClient.post("/users", {
        ...data,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  getOwnershipRequests: async (): Promise<OwnershipVerification[]> => {
    try {
      const res = await ApiClient.get("/users/ownership-verification-requests");
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateCarOwnership: async (carId, decision): Promise<Review[]> => {
    try {
      const res = await ApiClient.post(
        `/users/verify-car-ownership/${carId}`,
        null,
        {
          params: {
            isApproved: decision,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getStatus: async (): Promise<any> => {
    try {
      const res = await ApiClient.get("/users/status");
      console.log(res.data);

      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  //   deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  //   updateCar: (carId, updates) =>
  //     axios.patch(`${API_BASE_URL}/${carId}`, updates),
  // };
};
export default UserService;
