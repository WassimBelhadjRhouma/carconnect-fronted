export interface OwnershipVerification {
  id: number;
  carId: number;
  carMake: string;
  carModel: string;
  licensePlate: string;
  ownerId: number;
  ownerName: string;
  ownershipDocuments: string[];
  requestedAt: string;
  verified: boolean;
}

export interface LicenceVerification {
  id?: number;
  // ownerId: number;
  // ownerName: string;
  drivingLicenceFrontPage: string;
  drivingLicenceBackPage: string;
  // requestedAt: string;
  // verified: boolean;
}
