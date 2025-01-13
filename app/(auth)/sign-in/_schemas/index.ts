import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "This field must contain at least 6 letters." })
    .max(50, { message: "This field must be less than 50 characters." }),
});
