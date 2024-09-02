import { z } from 'zod'

export const formDataSchema = z.object({
    name: z.string().min(1, 'This field is required'),
    email: z.string().min(1, 'This field is required').email('Please enter a valid email address'),
    phone: z.string().min(1, 'This field is required'),
    plan: z.enum(["arcade", "advanced", "pro"]),
    billing: z.enum(["montly", "yearly"]),
    addons: z.object({
        onlineService: z.boolean(),
        largerStorage: z.boolean(),
        customizableProfile: z.boolean(),
    })
})