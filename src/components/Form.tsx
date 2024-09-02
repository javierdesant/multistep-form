import { FunctionComponent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod" // TODO: implement zod for safer validation

interface FormProps {
    steps: {
        id: `step-${number}`
        name: string
    }[]
}

interface FormValues {
    name: string
    email: string
    phone: number
    plan: "arcade" | "advanced" | "pro"
    billing: "montly" | "yearly"
    addons: {   //  TODO: get addons options from props
        onlineService: boolean
        largerStorage: boolean
        customizableProfile: boolean
    }
}
 
export default function Form({ steps }: FormProps) {

    const [currentStep, setCurrentStep] = useState(0)

    const form = useForm<FormValues>()

    const handlePrevStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const handleNextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentStep < steps.length)
            setCurrentStep(prevStep => prevStep + 1);
    };

    const { register } = form

    return ( 
        <div className="flex grow bg-white p-5">
            {/* <!-- Sidebar start --> */}

            <div className="flex flex-col w-[274px] h-[568px] shrink-0 p-5 bg-sidebar-desktop rounded-xl">
                {steps.map((step, index) => (
                    <div className="flex ml-2 my-4 items-center" key={step.id}>
                        <button id="step-1" 
                            className={`h-8 w-8 border font-bold text-sm rounded-full ${currentStep === index ? "bg-brand-pastel-blue text-brand-marine-blue" : "text-brand-alabaster" }`}
                            onClick={() => setCurrentStep(index)}
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
                noValidate
            >

                {/* <!-- Step 1 start --> */}

                { currentStep === 0 && <div className="flex flex-col">

                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                    
                    <label htmlFor="name" className=" mt-5 mb-2">Name</label>
                    <input type="text" id="name" placeholder="e.g. Stephen King" 
                        className="border-brand-light-gray text-brand-marine-blue focus:ring-brand-purplish-blue focus:border-brand-purplish-blue font-medium placeholder:opacity-70 rounded-lg py-3 px-4" 
                        {...register("name",
                            { required: "This field is required" }
                        )}
                    />
                    
                    <label htmlFor="email" className=" mt-5 mb-2">Email Address</label>
                    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com" 
                        className="border-brand-light-gray text-brand-marine-blue font-medium placeholder:opacity-70 rounded-lg py-3 px-4" 
                        {...register("email",
                            { required: "This field is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email address"
                                }
                             }
                        )}
                    />

                    <label htmlFor="phone" className=" mt-5 mb-2">Phone Number</label>
                    <input type="tel" id="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="e.g. +1 234 567 890" 
                        className="border-brand-light-gray text-brand-marine-blue font-medium placeholder:opacity-70 rounded-lg py-3 px-4" 
                        {...register("phone",
                            { required: "This field is required" }  // TODO: add phone number validation
                        )}
                    />
                        
                </div>}

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
                        <input type="checkbox" id="online-service" />
                        <div>
                            <h2>Online service</h2>
                            <p>Access to multiplayer games</p>
                        </div>
                        <span>+$1/mo</span>
                    </div>

                    <div>
                        <input type="checkbox" id="online-service" />
                        <div>
                            <h2>Larger storage</h2>
                            <p>Extra 1TB of cloud save</p>
                        </div>
                        <span>+$2/mo</span>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="online-service" />
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
                        disabled={currentStep === 0} 
                        className="flex w-min text-nowrap bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:invisible"
                        onClick={handlePrevStep}
                    >Previous</button>
                    <button 
                        disabled={currentStep === steps.length - 1} 
                        className="flex w-min text-nowrap peer bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg disabled:hidden"
                        onClick={handleNextStep}
                    >Next Step</button>
                    <button 
                        disabled={currentStep !== steps.length - 1}    // FIXME: inconsistent ugly logic
                        type="submit" 
                        className="flex w-min text-nowrap peer bg-brand-marine-blue text-brand-magnolia font-medium py-3 px-6 rounded-lg peer-enabled:hidden"
                    >Submit</button>
                </div>
            </form>
        </div>
     );
}