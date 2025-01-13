export interface Review {
  id?: number;
  comment: string;
  rating: number;
  car: {
    id: number;
  };
  booking: {
    id: number;
  };
  submittedAt?: string;
  userName?: string;
}
