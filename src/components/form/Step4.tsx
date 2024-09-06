import { useFormContext } from "react-hook-form"
import FormValues from "../../types/form.types"
import { addons } from "./Step3"

type Step4Props = {
    handleNav: (index: number) => Promise<void>
}

export default function Step4({ handleNav }: Step4Props) {

    const { getValues } = useFormContext<FormValues>()

  return (
    <div>

        <h1>Finishing up</h1>
        <p>Double-check everything looks OK before confirming.</p>

        <div className="flex flex-col px-7 py-5 bg-brand-magnolia rounded-xl">
            <div className="flex items-center pb-5 justify-between border-b">
                <div className="flex flex-col text-left">
                    <h6 className="font-medium text-brand-marine-blue capitalize">
                        {getValues("plan")} ({getValues("billing")})
                    </h6>
                    <button className="w-min" onClick={() => handleNav(2)}>
                        <p className="m-0 text-sm underline hover:no-underline">Change</p>
                    </button>
                </div>
                <span className="font-bold text-brand-marine-blue">$9/mo</span> {/** TODO: make dynamic */}
            </div>
            { addons.every(addon => !getValues(`addons.${addon.name}`)) 
                ? <p className="m-0 mt-4 text-sm">No addons selected</p>
                : addons.map((addon) => (
                    getValues(`addons.${addon.name}`) && (
                        <div className="flex justify-between mt-4" key={addon.name}>
                            <p className="m-0 text-sm">{addon.title}</p>
                            <span className="text-sm text-brand-marine-blue">
                                {getValues("billing") === "yearly" ? addon.yearlyPrice : addon.monthlyPrice}
                            </span>
                        </div>
                    )
                ))
            }
            
        </div>

        <div className="flex justify-between items-center p-8">
            <p className="m-0">Total (per {getValues("billing") === "yearly" ? "year" : "month"}) </p>
            <span className="text-xl font-bold text-brand-purplish-blue">+12/mo</span> {/** TODO: make dynamic */}
        </div>
    </div>
  )
}
