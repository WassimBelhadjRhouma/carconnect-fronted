import { AxiosResponse } from "axios";
import {
  BookingStatus,
  GetBookingsResponse,
} from "../interfaces/BookingInterfaces";
import { ApiClient } from "./apiClient";

const pathURL = "/bookings";

const BookingService = {
  addBookingRequest: async (data, carId): Promise<AxiosResponse<any>> => {
    try {
      const res = await ApiClient.post(pathURL, {
        ...data,
        car: { id: carId },
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },

  getBookings: async (): Promise<GetBookingsResponse> => {
    try {
      const res = await ApiClient.get(`${pathURL}/all`);
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
export default BookingService;
