import { Car } from "./CarInterfaces";

export interface Booking {
  id?: number;
  startDate?: string;
  endDate?: string;
  message?: string;
  amount?: string;
  status?: BookingStatus;
  car?: Car;
  reviewed?: boolean;
  paid?: boolean;
}
export interface GetBookingsResponse {
  ownerRequests: Booking[];
  renterBookings: Booking[];
}

export interface DateInterval {
  unavailableFrom: string;
  unavailableTo: string;
}
export interface AvailabilityDate extends DateInterval {
  id?: number;
  carId?: number;
}

export enum BookingStatus {
  PENDING = "PENDING",
  REFUSED = "REFUSED",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export enum BookingTypes {
  OWNER = "OWNER",
  RENTER = "RENTER",
}
