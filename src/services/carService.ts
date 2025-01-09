import axios, { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";

const userId = sessionStorage.getItem("userId");

const pathURL = "/cars";
const apiClient = ApiClient(pathURL);

interface test {
  id: string;
  title: string;
  price: string;
}

const CarService = {
  addCar: async (carData): Promise<AxiosResponse<any>> => {
    try {
      const response = await apiClient.post("", { ...carData });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getCars: async (filter): Promise<test[]> => {
    try {
      const response = await apiClient.post("/filter", filter); // we used POST because we have the intention to use more advanced filter options, which will be complicated to pass all of them in params.
      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  },
  getCar: async (id): Promise<AxiosResponse<any>> => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getCarByUSerId: async (): Promise<AxiosResponse<any>[]> => {
    try {
      const response = await apiClient.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteCar: async (carId): Promise<AxiosResponse<any>> => {
    try {
      const response = await apiClient.delete(`/${carId}`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateCar: async (carId, updates): Promise<AxiosResponse<any>> => {
    try {
      const response = await apiClient.patch(`/${carId}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default CarService;
