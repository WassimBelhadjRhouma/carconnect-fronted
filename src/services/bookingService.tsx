import { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";
import {
  BookingStatus,
  GetBookingsResponse,
} from "../interfaces/BookingInterfaces";

const userId = sessionStorage.getItem("userId");

const pathURL = "/bookings";
const apiClient = ApiClient(pathURL);

const BookingService = {
  addBookingRequest: async (data, carId): Promise<AxiosResponse<any>> => {
    try {
      const res = await apiClient.post("", {
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
      const res = await apiClient.get(`/all`);
      console.log(res);

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
      const res = await apiClient.put(`/${bookingId}/status`, null, {
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
export default BookingService;
