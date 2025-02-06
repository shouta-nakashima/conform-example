import {z} from 'zod';

export const UserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  age: z.number().int().positive(),
})

export type User = z.infer<typeof UserSchema>;