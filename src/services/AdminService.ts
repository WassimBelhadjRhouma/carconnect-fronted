import { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";
import {
  BookingStatus,
  GetBookingsResponse,
} from "../interfaces/BookingInterfaces";
import { Review } from "../interfaces/ReviewInterfaces";
import {
  LicenceVerification,
  OwnershipVerification,
} from "../interfaces/Verifications";

const pathURL = "/admin";

const AdminService = {
  getOwnershipRequests: async (): Promise<OwnershipVerification[]> => {
    try {
      const res = await ApiClient.get(
        `${pathURL}/ownership-verification-requests`
      );
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateCarOwnership: async (carId, decision): Promise<Review[]> => {
    try {
      const res = await ApiClient.post(
        `${pathURL}/verify-car-ownership/${carId}`,
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
  getLicenceRequests: async (): Promise<LicenceVerification[]> => {
    try {
      const res = await ApiClient.get(
        `${pathURL}/driver-verification-requests`
      );
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateLicence: async (userId, decision): Promise<Review[]> => {
    try {
      const res = await ApiClient.post(
        `${pathURL}/verify-driver-license/${userId}`,
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
  //   deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  //   updateCar: (carId, updates) =>
  //     axios.patch(`${API_BASE_URL}/${carId}`, updates),
  // };
};
export default AdminService;
