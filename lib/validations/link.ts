import { z } from 'zod';

export const LinkValidation = z.object({
  url: z.string().url().min(1),
  shortUrl: z.string().min(1).max(5),
  userId: z.string().max(30),
  title: z.string().max(30)
});