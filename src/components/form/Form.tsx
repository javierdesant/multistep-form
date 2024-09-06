import { useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formDataSchema } from '../../lib/schema.ts'
import CompleteStep from "./CompleteStep.tsx"
import FormValues, { Steps } from "../../types/form.types.ts"
import Step1 from "./Step1.tsx"
import Step2 from "./Step2.tsx"
import Step3 from "./Step3.tsx"
import Step4 from "./Step4.tsx"

interface FormProps {}

const steps: Steps = [
    { id: "complete", name: "Complete", fields: [] },
    { id: "step-1", name: "Your info", fields: ["name", "email", "phone"] },
    { id: "step-2", name: "Select plan", fields: ["plan"] },
    { id: "step-3", name: "Add-ons", fields: ["billing"] },
    { id: "step-4", name: "Summary", fields: ["addons"] },
]

const LAST_STEP = steps.length - 1;
const COMPLETE_STEP = 0;
 
export default function Form({}: FormProps) {

    const [currentStep, setCurrentStep] = useState(1)

    const methods = useForm<FormValues>({
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plan: "arcade",
            billing: "monthly",
            addons: {
                customizableProfile: false,
                largerStorage: false,
                onlineService: false,
            },
        },
        resolver: zodResolver(formDataSchema)
    })

    const onSubmit = useCallback((data: FormValues) => {
        const selectedAddons = Object.fromEntries(
            Object.entries(data.addons).filter(([_, value]) => value)
        )
    
        const filteredData = {
            ...data,
            addons: selectedAddons,
        }
    
        window.alert(JSON.stringify(filteredData, null, 4));
        setCurrentStep(COMPLETE_STEP);
    }, []);

    const onError = useCallback((values: FormValues) => {
        window.alert("ERROR:\n" + JSON.stringify(values, null, 4))
    }, [])

    const handleNav = async (index: number) => {
        let isValid = true;
        let failedStep = currentStep;
        for (let i = currentStep; i <= index && isValid; i++) {
            isValid = await methods.trigger(steps[i].fields)
            if (!isValid) {
                failedStep = i
            }
        }

        if (isValid) {
            setCurrentStep(index)
        } else {
            setCurrentStep(failedStep)
        }
    }


    return ( 
        <div className="flex w-full h-full max-w-[1050px] max-h-[600px] bg-white p-4 rounded-2xl shadow-xl">

            <div className="flex flex-col w-[274px] min-h-[568px] shrink-0 p-5 pt-7 bg-sidebar-desktop rounded-xl">
                {steps.map((step, index) => (
                    index !== COMPLETE_STEP &&
                    <div className="flex ml-2 my-3 items-center" key={step.id}>
                        <button id={step.id}
                            disabled={ `step-${currentStep}` === step.id || currentStep === COMPLETE_STEP }
                            className={`h-8 w-8 border font-bold text-sm rounded-full ${currentStep === index ? "bg-brand-pastel-blue text-brand-marine-blue" : "text-brand-alabaster" }`}
                            onClick={() => handleNav(index)}
                        >{index}</button>
                        <div className="flex flex-col items-baseline uppercase ml-5">
                            <span className="text-xs text-brand-light-gray">Step {index}</span>
                            <span className="font-bold text-brand-alabaster tracking-wider">{step.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <FormProvider {...methods}>
                <form 
                    className="flex flex-col grow px-24"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onError={() => onError}
                    noValidate
                >
                    
                    { currentStep === 1 && <Step1 /> }
                    { currentStep === 2 && <Step2 /> }
                    { currentStep === 3 && <Step3 /> }
                    { currentStep === 4 && <Step4 handleNav={handleNav} /> }

                    { currentStep === COMPLETE_STEP && <CompleteStep /> }

                    <div className="flex justify-between mt-auto mb-4">
                        <button 
                            disabled={currentStep === 1 || currentStep === COMPLETE_STEP} 
                            type="button"
                            className="flex w-min text-nowrap text-brand-cool-gray font-medium hover:text-brand-marine-blue my-3 disabled:invisible"
                            onClick={() => { handleNav(currentStep - 1) }}
                        >Go Back</button>
                        <button 
                            disabled={currentStep === LAST_STEP || currentStep === COMPLETE_STEP} 
                            type="button"
                            className="flex w-min text-nowrap bg-brand-marine-blue hover:bg-blue-900 text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                            onClick={() => { handleNav(currentStep + 1) }}
                        >Next Step</button>
                        <button 
                            disabled={currentStep !== LAST_STEP}
                            type="submit" 
                            className="flex w-min text-nowrap bg-brand-purplish-blue text-brand-magnolia font-medium py-3 px-7 rounded-lg hover:opacity-70 disabled:hidden"
                        >Confirm</button>
                    </div>

                </form>
            </FormProvider>
        </div>
     );
}