import { useFormContext } from "react-hook-form";
import FormValues from "../../types/form.types";
import { addons } from "./Step3";

type Step4Props = {
  handleNav: (index: number) => Promise<void>;
};

export default function Step4({ handleNav }: Step4Props) {
  const { getValues } = useFormContext<FormValues>();

  return (
    <div>
      <h1 className="my-4 md:mt-8">Finishing up</h1>
      <p className="mb-5 md:mb-10">Double-check everything looks OK before confirming.</p>

      <div className="flex flex-col rounded-xl bg-brand-magnolia px-7 py-5">
        <div className="flex items-center justify-between border-b pb-5">
          <div className="flex flex-col text-left">
            <h6 className="font-medium capitalize text-brand-marine-blue">
              {getValues("plan")} ({getValues("billing")})
            </h6>
            <button className="w-min" onClick={() => handleNav(2)}>
              <p className="text-sm underline hover:no-underline">Change</p>
            </button>
          </div>
          <span className="font-bold text-brand-marine-blue">$9/mo</span>{" "}
          {/** TODO: make dynamic */}
        </div>
        {addons.every((addon) => !getValues(`addons.${addon.name}`)) ? (
          <p className="mt-4 text-sm">No addons selected</p>
        ) : (
          addons.map(
            (addon) =>
              getValues(`addons.${addon.name}`) && (
                <div className="mt-4 flex justify-between" key={addon.name}>
                  <p className="text-sm">{addon.title}</p>
                  <span className="text-sm text-brand-marine-blue">
                    {getValues("billing") === "yearly"
                      ? addon.yearlyPrice
                      : addon.monthlyPrice}
                  </span>
                </div>
              ),
          )
        )}
      </div>

      <div className="flex items-center justify-between p-8">
        <p>
          Total (per {getValues("billing") === "yearly" ? "year" : "month"}){" "}
        </p>
        <span className="text-xl font-bold text-brand-purplish-blue">
          +12/mo
        </span>{" "}
        {/** TODO: make dynamic */}
      </div>
    </div>
  );
}
