import { Controller, useFormContext } from "react-hook-form";
import ToggleSwitch from "../ToggleSwitch";
import FormValues from "../../types/form.types";

export default function Step2() {
  
    const { formState: { errors }, watch, reset, getValues, setValue, control } = useFormContext<FormValues>()

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
    <div className="flex flex-col">

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

        <div className="relative flex w-full h-2">
            { errors.plan && <span className="absolute right-0 left-0 text-sm text-center mt-3 font-bold text-brand-strawberry-red">{errors.plan.message}</span> }
        </div>

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
    </div>
  )
}
