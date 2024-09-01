import { FunctionComponent, useState } from "react"
import { z } from "zod" // TODO: implement zod for safer validation

interface FormProps {
    // name: string
    // email: string
    // phone: number
    // plan: "arcade" | "advanced" | "pro"
    // billing: "montly" | "yearly"
    // addons: {   // TODO: get addons options from props
    //     onlineService: boolean
    //     largerStorage: boolean
    //     customizableProfile: boolean
    // }
}
 
const Form: FunctionComponent<FormProps> = () => {

    const [step, setStep] = useState(1)

    return ( 
        <div className="flex grow bg-white p-5">
            {/* <!-- Sidebar start --> */}

            <div className="flex flex-col bg-blue-600">
                <div className="flex">
                    <button id="step-1">1</button>
                    <div className="flex flex-col items-baseline">
                        <label htmlFor="step-1">Step 1</label>
                        <label htmlFor="step-1">Your info</label>
                    </div>
                </div>

                <div className="flex">
                    <button id="step-2">2</button>
                    <div className="flex flex-col items-baseline">
                        <label htmlFor="step-2">Step 2</label>
                        <label htmlFor="step-1">Select plan</label>
                    </div>
                </div>

                <div className="flex">
                    <button id="step-3">3</button>
                    <div className="flex flex-col items-baseline">
                        <label htmlFor="step-3">Step 3</label>
                        <label htmlFor="step-1">Add-ons</label>
                    </div>
                </div>

                <div className="flex">
                    <button id="step-4">4</button>
                    <div className="flex flex-col items-baseline">
                        <label htmlFor="step-4">Step 4</label>
                        <label htmlFor="step-1">Summary</label>
                    </div>
                </div>
            </div>

            {/* <!-- Sidebar end --> */}

            <form action="" className="flex grow flex-col px-24">

                {/* <!-- Step 1 start --> */}

                { step === 1 && <div>

                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                    
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="e.g. Stephen King" />
                    
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com" />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" id="phone" placeholder="e.g. +1 234 567 890" />
                
                </div>}

                {/* <!-- Step 1 end -->

                <!-- Step 2 start --> */}

                {step === 2 && <div>

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

                </div>}

                {/* <!-- Step 2 end -->

                <!-- Step 3 start --> */}

                {step === 3 && <div>

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

                </div>}

                {/* <!-- Step 3 end -->

                <!-- Step 4 start --> */}

                {step === 4 && <div>


                    <h1>Finishing up</h1>
                    <p>Double-check everything looks OK before confirming.</p>

                    {/* <!-- Dynamically add subscription and add-on selections here --> */}

                    <p>Total (per month/year)</p> {/** Dynamically change billing type */}
                
                </div>}

                {/* <!-- Step 4 end -->

                <!-- Step 5 start --> */}

                {step === 5 && <div>

                    <img src="../assets/images/icon-thank-you.svg" alt="" />

                    <h1>Thank you!</h1>

                    <p>
                        Thanks for confirming your subscription! We hope you have fun 
                        using our platform. If you ever need support, please feel free 
                        to email us at support@loremgaming.com.
                    </p>

                </div>}

                {/* <!-- Step 5 end --> */}

                <button>Go Back</button>
                <button>Next Step</button>

            </form>
        </div>
     );
}
 
export default Form;