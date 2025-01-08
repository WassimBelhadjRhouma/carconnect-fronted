import axios, { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";

const userId = sessionStorage.getItem("userId");

const pathURL = "/cars";
const apiClient = ApiClient(pathURL);

const CarService = {
  addCar: (carData) => {
    return axios.post({ ...carData, owner: { id: userId } });
  },
  getCars: async (filter): Promise<AxiosResponse<any>[]> => {
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
      const response = await axios.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getCarByUSerId: () => axios.get(`/user/${userId}`),

  deleteCar: (carId) => axios.delete(`/${carId}`, { params: { userId } }),
  updateCar: (carId, updates) => axios.patch(`/${carId}`, updates),
};

export default CarService;
