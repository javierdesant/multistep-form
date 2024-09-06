import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { FormValues } from "../components/form/Form";

type Step = {
    id: `step-${number}`
    name: string
    fields: (keyof FormValues)[]
}

type Steps = [
    { id: "complete", name: "Complete", fields: [] },
    ...Step[]
]

type StepProps = {
    errors: FieldErrors<FormValues>
    register: UseFormRegister<FormValues>    
    control: Control<FormValues, any>
}

type Addon = {
    name: keyof FormValues['addons']
    title: string
    description: string
    price: number
    monthlyPrice: `+${number}/mo`
    yearlyPrice: `+${number}/yr`
}

export {
    type Steps,
    type StepProps,
    type Addon,
}