import { z } from 'zod';

const createdUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

// await createdUserZodSchema.parseAsync(req)

export const userValidation = {
  createdUserZodSchema,
};
