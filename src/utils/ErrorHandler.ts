export const handleApiError = (error: any): CustomResponse => {
    const status = error.response?.status;
  
    switch (status) {
      case 400:
        return {message: "Invalid input. Please check your data.", status};
      case 401:
        return {message: "Unauthorized. Please log in.", status};
      case 403:
        return {message:"You don't have permission to perform this action.", status};
      case 404:
        return {message: "The requested resource was not found.", status};
      case 409:
        return {message: "This email is already registered.", status};
      case 500:
        return {message: "Server error. Please try again later.", status};
      default:
        console.log("unhandled error: ", error);
        return {message:"An unexpected error occurred. Please try again later.", status: status || "error occured, try again later"};
    }
  };

  export interface CustomResponse {
    message: string;
    status: number|string;
  }