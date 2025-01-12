export interface Car {
  id?: number;
  title?: string;
  description?: string;
  make?: string;
  model?: string;
  drivingMode?: DrivingMode;
  fuelType?: fuelType;
  licencePlate?: string;
  pricePerDay?: string | number;
  mileage?: string;
  postalCode?: string;
  city?: string;
  streetAddress?: string;
  constructionYear?: string;
  imageDataList?: any[];
  images?: string[];
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
