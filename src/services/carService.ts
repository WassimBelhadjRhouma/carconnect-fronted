import { AxiosResponse } from "axios";
import { Car } from "../interfaces/CarInterfaces";
import {
  AvailabilityDate,
  DateInterval,
} from "../interfaces/BookingInterfaces";
import { ApiClient } from "./apiClient";

const pathURL = "/cars";

const CarService = {
  addCar: async (carData: Car): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.post(pathURL, carData);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  getCars: async (filter): Promise<Car[]> => {
    try {
      const response = await ApiClient.post(`${pathURL}/filter`, filter);
      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  },
  getCar: async (id): Promise<Car> => {
    try {
      const response = await ApiClient.get(`${pathURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getCarByUSerId: async (): Promise<Car[]> => {
    try {
      const response = await ApiClient.get(`${pathURL}/user`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteCar: async (carId): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.delete(`${pathURL}/${carId}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateCar: async (carId, updates): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.put(`${pathURL}/${carId}`, updates);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAvailabilities: async (carId): Promise<AvailabilityDate[]> => {
    try {
      const res = await ApiClient.get(`${pathURL}/${carId}/availabilities`);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  addUnavailableDates: async (
    dates: DateInterval,
    carId: number
  ): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.post(
        `${pathURL}/${carId}/availabilities`,
        {
          startDate: dates.unavailableFrom,
          endDate: dates.unavailableTo,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteAvailability: async (
    availabilityId,
    dates
  ): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.delete(
        `${pathURL}/availabilities/${availabilityId}`,
        dates
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default CarService;
