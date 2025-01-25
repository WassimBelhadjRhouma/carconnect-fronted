import { z } from "zod";

const BaseCarSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  pricePerDay: z.string().min(2, "Price required"),
  postalCode: z.string().min(2, "Postal Code required"),
  city: z.string().min(2, "City is required"),
  streetAddress: z.string().min(2, "Street Address is required"),
});

export const AddCarSchema = BaseCarSchema.extend({
  imageDataList: z.array(z.any()),
  frontImage: z.string(),
  backImage: z.string(),
  licencePlate: z.string().min(5, "Licence Plate required"),
});

export const UpdateCarSchema = BaseCarSchema.extend({
  title: z.string().min(10, "Title is required"),
  description: z.string().min(20, "Description is required"),
  pricePerDay: z.string().min(1, "Price required"),
  postalCode: z.string().min(3, "Postal Code required"),
  city: z.string().min(3, "City is required"),
  streetAddress: z.string().min(3, "Street Address is required"),
});
