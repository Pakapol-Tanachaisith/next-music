import * as z from "zod";

export const SongFormSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  artist: z.string().min(1, { message: "artist is required" }),
  genre: z.string().optional(),
  imageUrl: z.string().url().min(1, { message: "image is required" }),
  audioUrl: z.string().url().min(1, { message: "audio is required" }),
});

export type SongFormData = z.infer<typeof SongFormSchema>;
