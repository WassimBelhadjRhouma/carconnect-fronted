export interface Car {
  id: number;
  title: string;
  description: string;
  make: string;
  model: string;
  driving_mode: DrivingMode;
  fuel_type: fuelType;
  licence_plate: string;
  price_per_day: number;
  mileage: number;
  postal_code: string;
  city: string;
  street_address: string;
  year: number;
}

export enum DrivingMode {
  automatic = "Automatic",
  manual = "Manuel",
}

export enum fuelType {
  petrol = "Petrol (Benzene)",
  electric = "Electric",
  hybrid = "Hybrid",
}
