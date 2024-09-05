import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const formDataSchema = z.object({
    name: z.string().min(1, 'This field is required'),
    email: z.string().min(1, 'This field is required').email('Please enter a valid email address'),
    phone: z.string({ message: 'This field is required' }).min(1, 'This field is required').refine(value => isValidPhoneNumber(value), {
        message: "Please enter a valid phone number"
    }),
    plan: z.enum(["arcade", "advanced", "pro"], { message: 'Please select a plan' }),
    billing: z.enum(["montly", "yearly"]),
    addons: z.object({
        onlineService: z.boolean(),
        largerStorage: z.boolean(),
        customizableProfile: z.boolean(),
    })
})