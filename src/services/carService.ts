import axios from "axios";

const API_BASE_URL = "/api/cars";

const CarService = {
  addCar: (carData) => {
    return axios.post(API_BASE_URL, carData);
  },
  getCars: (filter) => axios.post(API_BASE_URL + "/filter", filter), // we used POST because we have the intention to use more advanced filter options, which will be complicated to pass all of them in params.

  getCar: (id) => axios.get(API_BASE_URL + `/${id}`),

  deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  updateCar: (carId, updates) =>
    axios.patch(`${API_BASE_URL}/${carId}`, updates),
};

export default CarService;
