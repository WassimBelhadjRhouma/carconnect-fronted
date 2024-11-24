import axios from "axios";

const API_BASE_URL = "/api/cars";

const CarService = {
  addCar: (carData) => {
    return axios.post(API_BASE_URL, carData);
  },

  deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  updateCar: (carId, carData) => axios.put(`${API_BASE_URL}/${carId}`, carData),
  getCars: () => axios.get(API_BASE_URL),
};

export default CarService;

// {
//   "make": "Toyota",
//   "model": "Camry",
//   "year": 2021,
//   "licencePlate": "XYZ123",
//   "mileage": 15000,
//   "pricePerDay": 50.0,
//   "availability": "available",
//   "location": "Berlin",
//   "owner": {
//     "id":1
//   }
//   }
