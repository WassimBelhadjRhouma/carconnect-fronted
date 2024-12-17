import axios from "axios";

const API_BASE_URL = "https://localhost:8443/api/bookings";
const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const BookingService = {
  addBookingRequest: (dates, carId) => {
    return axios.post(API_BASE_URL, {
      ...dates,
      renter: { id: userId },
      car: { id: carId },
    });
  },
  getBookings: () => axios.get(API_BASE_URL + `/user/${userId}`),
  deleteCar: (carId) => axios.delete(`${API_BASE_URL}/${carId}`),
  updateCar: (carId, updates) =>
    axios.patch(`${API_BASE_URL}/${carId}`, updates),
};

export default BookingService;
