import { Controller, useFormContext } from "react-hook-form";
import ToggleSwitch from "../ToggleSwitch";
import FormValues, { Plan } from "../../types/form.types";

type Step2Props = {
  plans: Plan[];
};

export default function Step2({ plans }: Step2Props) {
  const { watch, getValues, setValue, control } = useFormContext<FormValues>();

  let currentPlan = watch("plan");

  const handleTogglePlan = (plan: FormValues["plan"]) => {
    if (currentPlan !== plan) {
      setValue("plan", plan, { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="my-3 lg:mt-8">Select your plan</h1>
      <p className="mb-5 lg:mb-10">
        You have the option of monthly or yearly billing.
      </p>

      <div className="grid grid-cols-1 grid-rows-3 gap-5 lg:grid-cols-3 lg:grid-rows-1">
        {plans.map((plan) => (
          <button
            type="button"
            key={plan.name}
            className={`flex items-center rounded-lg p-3 ring-1 hover:ring-brand-purplish-blue focus:outline-none focus:outline-brand-purplish-blue lg:h-52 lg:flex-col lg:items-baseline lg:justify-between lg:rounded-xl lg:p-5 ${
              watch("plan") === plan.name
                ? "bg-brand-magnolia ring-brand-purplish-blue"
                : "ring-brand-light-gray"
            }`}
            onClick={() => handleTogglePlan(plan.name)}
          >
            <img
              src={`/img/${plan.icon}`}
              alt={`${plan.name} icon`}
              className={`${watch("billing") === "yearly" && "place-self-start"} h-10 md:h-12 lg:h-14 lg:place-self-start`}
            />
            <div className="ml-5 flex flex-col lg:m-0">
              <h3 className="text-left capitalize">{plan.name}</h3>
              <p className="text-nowrap text-left text-sm md:text-base">
                {getValues("billing") === "yearly"
                  ? plan.yearlyPrice
                  : plan.monthlyPrice}
              </p>
              {watch("billing") === "yearly" && (
                <span className="text-left text-sm text-brand-marine-blue lg:mt-2">
                  2 months free
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-5 lg:my-10">
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
  );
}
