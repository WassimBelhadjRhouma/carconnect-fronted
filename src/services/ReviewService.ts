import { AxiosResponse } from "axios";
import { BookingStatus } from "../interfaces/BookingInterfaces";
import { Review } from "../interfaces/ReviewInterfaces";
import { ApiClient } from "./apiClient";

const pathURL = "/reviews";

const ReviewService = {
  addReview: async (requestBody: Review): Promise<AxiosResponse<any>> => {
    console.log(requestBody);

    try {
      const res = await ApiClient.post(pathURL, {
        ...requestBody,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },

  getReviews: async (carId: string): Promise<Review[]> => {
    try {
      const res = await ApiClient.get(`${pathURL}/car/${carId}`);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateBookingStatus: async (
    bookingId: Number,
    status: BookingStatus
  ): Promise<any> => {
    console.log(bookingId, status);
    try {
      const res = await ApiClient.put(`${pathURL}/${bookingId}/status`, null, {
        params: {
          status,
        },
      });

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
export default ReviewService;
