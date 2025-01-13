import { z } from "zod";

export const VerifyLicenceSchema = z.object({
  drivingLicenceFrontPage: z.string(),
  drivingLicenceBackPage: z.string(),
});
