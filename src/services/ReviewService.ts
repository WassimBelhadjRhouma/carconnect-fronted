import { AxiosResponse } from "axios";
import { BookingStatus } from "../interfaces/BookingInterfaces";
import { Review } from "../interfaces/ReviewInterfaces";
import { ApiClient } from "./apiClient";

const pathURL = "/reviews";

const ReviewService = {
  addReview: async (requestBody: Review): Promise<AxiosResponse<any>> => {
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
};
export default ReviewService;
