import axios from "axios";

const API_BASE_URL = "https://localhost:8443/api/cars";
const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const CarService = {
  addCar: (carData) => {
    return axios.post(API_BASE_URL, { ...carData, owner: { id: userId } });
  },
  getCars: (filter) => axios.post(API_BASE_URL + "/filter", filter), // we used POST because we have the intention to use more advanced filter options, which will be complicated to pass all of them in params.

  getCar: (id) => axios.get(API_BASE_URL + `/${id}`),

  getCarByUSerId: () => axios.get(API_BASE_URL + `/user/${userId}`),

  deleteCar: (carId) =>
    axios.delete(`${API_BASE_URL}/${carId}`, { params: { userId } }),
  updateCar: (carId, updates) =>
    axios.patch(`${API_BASE_URL}/${carId}`, updates),
};

export default CarService;
