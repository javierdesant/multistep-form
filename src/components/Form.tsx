import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import ToggleSwitch from "./ToggleSwitch.tsx"
import { formDataSchema } from '../lib/schema.ts'
import { DevTool } from "@hookform/devtools";

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

type Addons = {
    name: (keyof FormValues['addons']), 
    title: string,
    description: string,
    monthlyPrice: `+${string}/mo`, 
    yearlyPrice: `+${string}/yr` 
}[]

const addons: Addons = [
    { name: "onlineService", title: "Online service", description: "Access to multiplayer games", monthlyPrice: "+$1/mo", yearlyPrice: "+$10/yr" },
    { name: "largerStorage", title: "Larger storage", description: "Extra 1TB of cloud save", monthlyPrice: "+$2/mo", yearlyPrice: "+$20/yr" },
    { name: "customizableProfile", title: "Customizable profile", description: "Custom theme on your profile", monthlyPrice: "+$2/mo", yearlyPrice: "+$20/yr" },
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
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plan: undefined,
            billing: "monthly",
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

    const onError = useCallback((values: FormValues) => {
        window.alert(JSON.stringify(values, null, 4))
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

    let currentPlan = watch("plan")

    const handleTogglePlan = (plan: FormValues["plan"]) => {
        if (currentPlan === plan) {
            reset({
                ...getValues(),
                plan: undefined
            }, { keepDirty: true, keepTouched: true });
        } else {
            setValue("plan", plan, { shouldValidate: true });
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
                onError={() => onError}
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
                            className={`flex flex-col justify-between ring-1 p-5 h-52 focus:outline-none focus:outline-brand-purplish-blue rounded-xl
                                hover:ring-brand-purplish-blue
                                ${errors.plan 
                                    ? "ring-1 ring-brand-strawberry-red" 
                                    : watch("plan") === "arcade" 
                                        ? "ring-brand-purplish-blue bg-brand-magnolia" 
                                        : "ring-brand-light-gray"
                                }`}
                            onClick={() => handleTogglePlan("arcade")}
                        >
                            <img src="/img/icon-arcade.svg" alt="arcade-icon" className="h-14 place-self-start" />
                            <div className="flex flex-col">
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Arcade</h3>
                                <p className="mb-0 text-left">{getValues("billing") === "yearly" ? "$90/yr" : "$9/mo"}</p>
                                {watch("billing") === "yearly" && <span className="text-sm text-brand-marine-blue text-left mt-2">2 months free</span>}
                            </div>
                        </button>

                        <button 
                            type="button"
                            className={`flex flex-col justify-between ring-1 p-5 h-52 focus:outline-none focus:outline-brand-purplish-blue rounded-xl
                                hover:ring-brand-purplish-blue
                                ${errors.plan 
                                    ? "ring-1 ring-brand-strawberry-red" 
                                    : watch("plan") === "advanced" 
                                        ? "ring-brand-purplish-blue bg-brand-magnolia" 
                                        : "ring-brand-light-gray"
                                }`}
                            onClick={() => handleTogglePlan("advanced")}
                        >
                            <img src="/img/icon-advanced.svg" alt="advanced-icon" className="h-14 place-self-start" />
                            <div className="flex flex-col">
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Advanced</h3>
                                <p className="mb-0 text-left">{getValues("billing") === "yearly" ? "$120/yr" : "$12/mo"}</p>
                                {watch("billing") === "yearly" && <span className="text-sm text-brand-marine-blue text-left mt-2">2 months free</span>}
                            </div>
                        </button>

                        <button 
                            type="button"
                            className={`flex flex-col justify-between ring-1 p-5 h-52 focus:outline-none focus:outline-brand-purplish-blue rounded-xl
                                hover:ring-brand-purplish-blue
                                ${errors.plan 
                                    ? "ring-1 ring-brand-strawberry-red" 
                                    : watch("plan") === "pro" 
                                        ? "ring-brand-purplish-blue bg-brand-magnolia" 
                                        : "ring-brand-light-gray"
                                }`}
                            onClick={() => handleTogglePlan("pro")}
                        >
                            <img src="/img/icon-pro.svg" alt="pro-icon" className="h-14 place-self-start" />
                            <div className="flex flex-col">
                                <h3 className=" text-xl text-left font-medium text-brand-marine-blue">Pro</h3>
                                <p className="mb-0 text-left">{getValues("billing") === "yearly" ? "$150/yr" : "$15/mo"}</p>
                                {watch("billing") === "yearly" && <span className="text-sm text-brand-marine-blue text-left mt-2">2 months free</span>}
                            </div>
                        </button>
                    </div>

                    { errors.plan && <span className=" text-sm text-center mt-3 font-bold text-brand-strawberry-red">{errors.plan.message}</span> }

                    <div className="flex h-12 w-full my-10 bg-brand-magnolia justify-center items-center">
                        <Controller 
                            control={control}
                            name="billing"
                            render={({ field: { onChange, value } }) => (
                                <ToggleSwitch
                                    value={value}
                                    onChange={onChange}
                                    label1="Monthly"
                                    label2="Yearly"
                                />
                            )}
                        />
                    </div>
                </div> }

                {/* <!-- Step 2 end -->

                <!-- Step 3 start --> */}

                { currentStep === 3 && <div className="flex flex-col">

                    <h1>Pick add-ons</h1>
                    <p>Add-ons help enhance your gaming experience.</p>

                    <div className="grid grid-cols-1 grid-rows-3 gap-5">
                        { addons.map((addon) => (
                            <label htmlFor={`addons.${addon.name}`} className="text-base cursor-pointer">
                                <div className="flex grow items-center justify-between border group hover:border-brand-purplish-blue has-[:checked]:border-brand-purplish-blue has-[:checked]:bg-brand-magnolia py-4 px-5 rounded-xl">
                                    <input type="checkbox" className=" text-brand-purplish-blue rounded mr-5 size-5" id={`addons.${addon.name}`}
                                        {...register(`addons.${addon.name}`)}
                                        />
                                    <div className="flex flex-col grow">
                                        <h2 className="font-medium">{addon.title}</h2>
                                        <p className="m-0">{addon.description}</p>
                                    </div>
                                    <span className="text-right text-brand-purplish-blue">{getValues("billing") === "yearly" ? addon.yearlyPrice : addon.monthlyPrice}</span>
                                </div>
                            </label>
                        )) }
                    </div>
                </div> }

                {/* <!-- Step 3 end -->

                <!-- Step 4 start --> */}

                { currentStep === 4 && <div>


                    <h1>Finishing up</h1>
                    <p>Double-check everything looks OK before confirming.</p>

                    <div className="flex flex-col px-7 py-5 bg-brand-magnolia rounded-xl">
                        <div className="flex items-center pb-5 justify-between border-b">
                            <div className="flex flex-col text-left">
                                <h6 className="font-medium text-brand-marine-blue capitalize">
                                    {getValues("plan")} ({getValues("billing")})
                                </h6>
                                <button className="w-min">
                                    <p className="m-0 text-sm underline hover:no-underline">Change</p>
                                </button>
                            </div>
                            <span className="font-bold text-brand-marine-blue">$9/mo</span> {/** TODO: make dynamic */}
                        </div>
                        {addons.map((addon) => (
                            getValues(`addons.${addon.name}`) && <div className="flex justify-between mt-4">
                                <p className="m-0 text-sm">{addon.title}</p>
                                <span className="text-sm text-brand-marine-blue">{getValues("billing") === "yearly" ? addon.yearlyPrice : addon.monthlyPrice }</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center p-8">
                        <p className="m-0">Total (per {getValues("billing") === "yearly" ? "year" : "month"}) </p>
                        <span className="text-xl font-bold text-brand-purplish-blue">+12/mo</span> {/** TODO: make dynamic */}
                    </div>

                
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

                {/* <!-- Step 5 end --> 

                <!-- Navigation start --> */}

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
                        className="flex w-min text-nowrap bg-brand-purplish-blue text-brand-magnolia font-medium py-3 px-7 rounded-lg disabled:hidden"
                    >Confirm</button>
                </div>

                {/* <!-- Navigation end --> */}
            </form>
            
            <DevTool control={control} /> {/* set up the dev tool */}
        </div>
     );
}