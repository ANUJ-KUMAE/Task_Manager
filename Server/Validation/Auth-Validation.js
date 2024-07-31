const { z } = require("zod");

const AuthValidationSchena = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(3, { message: "First Name must be atleast 3 character" })
    .max(255, { message: "First Name must not be more than 255 characters" }),

  lastName: z
    .string({ required_error: "Last Name is required" })
    .trim()
    .min(3, { message: "Last Name must be atleast 3 character" })
    .max(255, { message: "Last Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email must be reauired" })
    .trim()
    .email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 charcaters" })
    .max(15, { message: "Password not be greater than 15 characters" }),
});

module.exports = AuthValidationSchena;
