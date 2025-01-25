import { AxiosResponse } from "axios";
import { ApiClient } from "./apiClient";

const pathURL = "/payments";

const PaymentService = {
  createPayment: async (bookingId: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await ApiClient.put(`${pathURL}/${bookingId}`, {
        paymentMethod: "Paypal",
      });

      return response;
    } catch (error) {
      console.log("payment error");

      throw new Error(error);
    }
  },

  getPayment: async (bookingId: string): Promise<any> => {
    try {
      const response = await ApiClient.get(`${pathURL}/${bookingId}`); // we used POST because we have the intention to use more advanced filter options, which will be complicated to pass all of them in params.
      return response.data;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  },
};

export default PaymentService;
