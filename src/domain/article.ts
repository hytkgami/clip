import { z } from "zod";

export const schema = z.object({
  title: z.string(),
  url: z.string().url(),
})
