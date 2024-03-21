import { z } from 'zod';

export const settingsSchema = z.object({ name: z.optional(z.string()) });
export type SettingsValues = z.infer<typeof settingsSchema>;
