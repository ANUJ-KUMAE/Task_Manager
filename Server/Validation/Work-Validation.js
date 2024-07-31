const { z } = require("zod");

const workValidation = z.object({
  workName: z
    .string({ required_error: "Task Name is Required" })
    .trim()
    .min(4, { message: "First Name must be atleast 4 character" })
    .max(255, { message: "First Name must not be more than 255 characters" }),

  description: z
    .string({ required_error: "Description is Required" })
    .trim()
    .min(4, { message: " Description Must be atleast 10 character" })
    .max(255, { message: " Description Must not be more than 255 characters" }),

  progress: z.string({ required_error: "Progress is Required" }),
});

module.exports = workValidation;
