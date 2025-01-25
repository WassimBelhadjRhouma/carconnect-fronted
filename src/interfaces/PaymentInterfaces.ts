export interface Payment {
  amount?: string;
  id?: number;
  paid?: boolean;
  paymentDate?: Date;
  paymentMethod?: string;
}

export enum PAYMENT_STATUS {
  PAID = "Paid",
  UNPAID = "Unpaid",
}
