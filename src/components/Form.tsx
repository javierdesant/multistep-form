import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod" // TODO: implement zod for safer validation
import { zodResolver } from "@hookform/resolvers/zod"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { formDataSchema } from '../lib/schema.ts'

interface FormProps {}

type FormValues = z.infer<typeof formDataSchema>;

type Step = {
    id: `step-${number}`
    name: string
    fields: (keyof FormValues)[]
}

type Steps = [
    ...Step[],
    { id: `step-${number}`, name: "Complete", fields: [] }
]

const steps: Steps = [
    { id: "step-1", name: "Your info", fields: ["name", "email", "phone"] },
    { id: "step-2", name: "Select plan", fields: ["plan"] },
    { id: "step-3", name: "Add-ons", fields: ["billing"] },
    { id: "step-4", name: "Summary", fields: ["addons"] },
    { id: "step-5", name: "Complete", fields: [] }
]

 
export default function Form({}: FormProps) {

    const [currentStep, setCurrentStep] = useState(0)

    const { 
        register, 
        control, 
        trigger,
        handleSubmit,
        formState: { 
            errors,
        },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plan: "arcade", // TEST
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
        handleNav(currentStep + 1)
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

    return ( 
        <div className="flex grow bg-white p-5">
            {/* <!-- Sidebar start --> */}

            <div className="flex flex-col w-[274px] min-h-[568px] shrink-0 p-5 bg-sidebar-desktop rounded-xl">
                {steps.slice(0, -1).map((step, index) => (
                    <div className="flex ml-2 my-4 items-center" key={step.id}>
                        <button id={step.id}
                            disabled={ `step-${currentStep + 1}` === step.id }
                            className={`h-8 w-8 border font-bold text-sm rounded-full ${currentStep === index ? "bg-brand-pastel-blue text-brand-marine-blue" : "text-brand-alabaster" }`}
                            onClick={() => handleNav(index)}
                        >{index+1}</button>
                        <div className="flex flex-col items-baseline uppercase ml-5">
                            <span className="text-xs text-brand-light-gray">Step {index+1}</span>
                            <span className="font-bold text-brand-alabaster tracking-wider">{step.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* <!-- Sidebar end --> */}

            <form 
                className="flex grow flex-col px-24"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >

                {/* <!-- Step 1 start --> */}

                { currentStep === 0 && <div className="flex flex-col">

                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                    
                    <div className="flex grow justify-between mt-5 mb-2">
                        <label htmlFor="name">Name</label>
                        { errors.name && <span className=" text-sm font-bold text-brand-strawberry-red">{errors.name.message}</span> }
                    </div>
                    <input type="text" id="name" placeholder="e.g. Stephen King" 
                        {...register("name")}
                    />
                    
                    <div className="flex grow justify-between mt-5 mb-2">
                        <label htmlFor="email">Email Address</label>
                        { errors.email && <span className=" text-sm font-bold text-brand-strawberry-red">{errors.email.message}</span> }
                    </div>
                    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com" 
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

                { currentStep === 1 && <div>

                    <h1>Select your plan</h1>
                    <p>You have the option of monthly or yearly billing.</p>

                    <button>
                        Arcade
                        $9/mo
                    </button>

                    <button>
                        Advanced
                        $12/mo
                    </button>

                    <button>
                        Pro
                        $15/mo
                    </button>

                    <div>
                        Monthly
                        Yearly
                    </div>

                </div> }

                {/* <!-- Step 2 end -->

                <!-- Step 3 start --> */}

                { currentStep === 2 && <div>

                    <h1>Pick add-ons</h1>
                    <p>Add-ons help enhance your gaming experience.</p>
                    
                    <div>
                        <input type="checkbox" id="addons.onlineService" 
                            {...register("addons.onlineService")}
                        />
                        <div>
                            <h2>Online service</h2>
                            <p>Access to multiplayer games</p>
                        </div>
                        <span>+$1/mo</span>
                    </div>

                    <div>
                        <input type="checkbox" id="addons.largerStorage" 
                            {...register("addons.largerStorage")} 
                        />
                        <div>
                            <h2>Larger storage</h2>
                            <p>Extra 1TB of cloud save</p>
                        </div>
                        <span>+$2/mo</span>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="addons.customizableProfile"
                            {...register("addons.customizableProfile")} 
                        />
                        <div>
                            <h2>Customizable Profile</h2>
                            <p>Custom theme on your profile</p>
                        </div>
                        <span>+$2/mo</span>
                    </div>

                </div> }

                {/* <!-- Step 3 end -->

                <!-- Step 4 start --> */}

                { currentStep === 3 && <div>


                    <h1>Finishing up</h1>
                    <p>Double-check everything looks OK before confirming.</p>

                    {/* <!-- Dynamically add subscription and add-on selections here --> */}

                    <p>Total (per month/year)</p> {/** Dynamically change billing type */}
                
                </div> }

                {/* <!-- Step 4 end -->

                <!-- Step 5 start --> */}

                { currentStep === 4 && <div>

                    <img src="../assets/images/icon-thank-you.svg" alt="" />

                    <h1>Thank you!</h1>

                    <p>
                        Thanks for confirming your subscription! We hope you have fun 
                        using our platform. If you ever need support, please feel free 
                        to email us at support@loremgaming.com.
                    </p>

                </div> }

                {/* <!-- Step 5 end --> */}

                <div className="flex justify-between mt-auto mb-4">
                    <button 
                        disabled={currentStep === 0 || currentStep === steps.length - 1} 
                        className="flex w-min text-nowrap text-brand-cool-gray my-3 disabled:invisible"
                        onClick={(event) => {
                            event.preventDefault()
                            handleNav(currentStep - 1)
                        }}
                    >Go Back</button>
                    <button 
                        disabled={currentStep >= steps.length - 2} 
                        className="flex w-min text-nowrap bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                        onClick={(event) => {
                            event.preventDefault()
                            handleNav(currentStep + 1)
                        }}
                    >Next Step</button>
                    <button 
                        disabled={currentStep !== steps.length - 2}    // FIXME: form doesnt submit
                        type="submit" 
                        className="flex w-min text-nowrap bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                    >Confirm</button>
                </div>
            </form>
        </div>
     );
}