import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number."),
  email: z
    .union([z.string().trim().email("Please enter a valid email address."), z.literal("")])
    .optional(),
  gender: z.string().optional(),
  course: z.string().min(1, "Please select a program of interest."),
  source: z.string().optional(),
  previousSchool: z.string().optional(),
  address: z.string().optional(),
  message: z.string().trim().min(5, "Please tell us a little about your inquiry."),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
