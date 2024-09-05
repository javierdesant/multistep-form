import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { formDataSchema } from '../lib/schema.ts'
import ToggleSwitch from "./ToggleSwitch.tsx"

interface FormProps {}

type FormValues = z.infer<typeof formDataSchema>;

type Step = {
    id: `step-${number}`
    name: string
    fields: (keyof FormValues)[]
}

type Steps = [
    { id: "complete", name: "Complete", fields: [] },
    ...Step[]
]

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

    const { 
        register, 
        control, 
        trigger,
        handleSubmit,
        setValue,
        watch,
        getValues,
        reset,
        formState: { 
            errors,
        },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plan: undefined,
            billing: "montly", // TEST
            addons: {
                customizableProfile: false,
                largerStorage: false,
                onlineService: false,
            },
        },
        resolver: zodResolver(formDataSchema)
    })

    const onSubmit = useCallback((values: FormValues) => {
        window.alert(JSON.stringify(values, null, 4))
        setCurrentStep(COMPLETE_STEP)
    }, [])

    const handleNav = async (index: number) => {
        let isValid = true;
        let failedStep = currentStep;
        for (let i = currentStep; i <= index && isValid; i++) {
            isValid = await trigger(steps[i].fields)
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

    const handleTogglePlan = (plan: FormValues["plan"]) => {
        if (getValues("plan") === plan) {
            reset({
                ...getValues(),
                plan: undefined
            });
        } else {
            setValue("plan", plan);
        }
    };


    return ( 
        <div className="flex w-full h-full max-w-[1050px] max-h-[600px] bg-white p-4 rounded-2xl shadow-xl">
            {/* <!-- Sidebar start --> */}

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

            {/* <!-- Sidebar end --> */}

            <form 
                className="flex flex-col grow px-24"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >

                {/* <!-- Step 1 start --> */}

                { currentStep === 1 && <div className="flex flex-col">

                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                    
                    <div className="flex grow justify-between mb-2">
                        <label htmlFor="name">Name</label>
                        { errors.name && <span className=" text-sm font-bold text-brand-strawberry-red">{errors.name.message}</span> }
                    </div>
                    <input type="text" id="name" placeholder="e.g. Stephen King" 
                        className={errors.name && "border-brand-strawberry-red" }
                        {...register("name")}
                    />
                    
                    <div className="flex grow justify-between mt-5 mb-2">
                        <label htmlFor="email">Email Address</label>
                        { errors.email && <span className=" text-sm font-bold text-brand-strawberry-red">{errors.email.message}</span> }
                    </div>
                    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com" 
                        className={errors.email && "border-brand-strawberry-red" }
                        {...register("email")}
                    />

                    <div className="flex grow justify-between mt-5 mb-2">
                        <label htmlFor="phone">Phone Number</label>
                        { errors.phone && <span className="text-sm font-bold text-brand-strawberry-red">{errors.phone.message}</span> }
                    </div>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                            <PhoneInput
                                className="phone-input"
                                value={value}
                                onChange={onChange}
                                defaultCountry="US"
                                placeholder="e.g. +1 234 567 890"
                                />
                        )}
                    />
                </div> }

                {/* <!-- Step 1 end -->

                <!-- Step 2 start --> */}

                { currentStep === 2 && <div className="flex flex-col">

                    <h1>Select your plan</h1>
                    <p>You have the option of monthly or yearly billing.</p>

                    <div className="grid grid-cols-3 grid-rows-1 gap-5">
                        <button 
                            type="button"
                            className={`flex flex-col justify-between ring-1 p-5 h-52 ${watch("plan") === "arcade" ? "ring-brand-purplish-blue bg-brand-light-blue" : "ring-brand-light-gray"} rounded-xl`}
                            onClick={() => handleTogglePlan("arcade")}
                        >
                            <img src="/img/icon-arcade.svg" alt="arcade-icon" className="h-14 place-self-start" />
                            <div>
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Arcade</h3>
                                <p className="mb-0 text-left">$9/mo</p>
                            </div>
                        </button>

                        <button 
                            type="button"
                            className={`flex flex-col justify-between ring-1 p-5 h-52 ${watch("plan") === "advanced" ? "ring-brand-purplish-blue bg-brand-light-blue" : "ring-brand-light-gray"} rounded-xl`}
                            onClick={() => handleTogglePlan("advanced")}
                        >
                            <img src="/img/icon-advanced.svg" alt="advanced-icon" className="h-14 place-self-start" />
                            <div>
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Advanced</h3>
                                <p className="mb-0 text-left">$12/mo</p>
                            </div>
                        </button>

                        <button 
                            type="button"
                            className={`flex flex-col justify-between ring-1 p-5 h-52 ${watch("plan") === "pro" ? "ring-brand-purplish-blue bg-brand-light-blue" : "ring-brand-light-gray"} rounded-xl`}
                            onClick={() => handleTogglePlan("pro")}
                        >
                            <img src="/img/icon-pro.svg" alt="pro-icon" className="h-14 place-self-start" />
                            <div>
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Pro</h3>
                                <p className="mb-0 text-left">$15/mo</p>
                            </div>
                        </button>
                    </div>

                    <div className="flex h-12 w-full my-10 bg-brand-magnolia justify-center items-center">

                        <ToggleSwitch
                            value="billing"
                            label1="Monthly"
                            label2="Yearly"
                        />

                    </div>

                </div> }

                {/* <!-- Step 2 end -->

                <!-- Step 3 start --> */}

                { currentStep === 3 && <div>

                    <h1>Pick add-ons</h1>
                    <p>Add-ons help enhance your gaming experience.</p>
                    
                    <div>
                        <input type="checkbox" id="addons.onlineService" 
                            {...register("addons.onlineService")}
                        />
                        <div>
                            <h2>Online service</h2>
                            <p className="m-0">Access to multiplayer games</p>
                        </div>
                        <span>+$1/mo</span>
                    </div>

                    <div>
                        <input type="checkbox" id="addons.largerStorage" 
                            {...register("addons.largerStorage")} 
                        />
                        <div>
                            <h2>Larger storage</h2>
                            <p className="m-0">Extra 1TB of cloud save</p>
                        </div>
                        <span>+$2/mo</span>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="addons.customizableProfile"
                            {...register("addons.customizableProfile")} 
                        />
                        <div>
                            <h2>Customizable Profile</h2>
                            <p className="m-0">Custom theme on your profile</p>
                        </div>
                        <span>+$2/mo</span>
                    </div>

                </div> }

                {/* <!-- Step 3 end -->

                <!-- Step 4 start --> */}

                { currentStep === 4 && <div>


                    <h1>Finishing up</h1>
                    <p>Double-check everything looks OK before confirming.</p>

                    {/* <!-- Dynamically add subscription and add-on selections here --> */}

                    <p>Total (per month/year)</p> {/** Dynamically change billing type */}
                
                </div> }

                {/* <!-- Step 4 end -->

                <!-- Step 5 start --> */}

                { currentStep === COMPLETE_STEP && <div className="flex grow flex-col justify-center items-center">

                    <img src="/img/icon-thank-you.svg" alt="thank-you-icon" className="w-20" />
                    <h1>Thank you!</h1>
                    <p className="text-center text-pretty text-lg tracking-wide mt-3 mx-3">
                        Thanks for confirming your subscription! We hope you have fun 
                        using our platform. If you ever need support, please feel free 
                        to email us at support@loremgaming.com.
                    </p>

                </div> }

                {/* <!-- Step 5 end --> */}

                <div className="flex justify-between mt-auto mb-4">
                    <button 
                        disabled={currentStep === 1 || currentStep === COMPLETE_STEP} 
                        type="button"
                        className="flex w-min text-nowrap text-brand-cool-gray my-3 disabled:invisible"
                        onClick={() => { handleNav(currentStep - 1) }}
                    >Go Back</button>
                    <button 
                        disabled={currentStep === LAST_STEP || currentStep === COMPLETE_STEP} 
                        type="button"
                        className="flex w-min text-nowrap bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                        onClick={() => { handleNav(currentStep + 1) }}
                    >Next Step</button>
                    <button 
                        disabled={currentStep !== LAST_STEP}
                        type="submit" 
                        className="flex w-min text-nowrap bg-brand-purplish-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                    >Confirm</button>
                </div>
            </form>
        </div>
     );
}