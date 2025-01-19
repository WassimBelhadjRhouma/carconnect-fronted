export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
}

export enum USER_STATUS {
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
  NOTVERIFIED = "NOTVERIFIED",
  PENDING = "PENDING",
}
