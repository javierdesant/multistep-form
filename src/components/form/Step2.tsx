import { Controller, useFormContext } from "react-hook-form";
import ToggleSwitch from "../ToggleSwitch";
import FormValues from "../../types/form.types";

export default function Step2() {
  const {
    formState: { errors },
    watch,
    reset,
    getValues,
    setValue,
    control,
  } = useFormContext<FormValues>();

  let currentPlan = watch("plan");

  const handleTogglePlan = (plan: FormValues["plan"]) => {
    if (currentPlan === plan) {
      reset(
        {
          ...getValues(),
          plan: undefined,
        },
        { keepDirty: true, keepTouched: true },
      );
    } else {
      setValue("plan", plan, { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="my-3 md:mt-8">Select your plan</h1>
      <p className="mb-5 md:mb-10">
        You have the option of monthly or yearly billing.
      </p>

      <div className="grid grid-cols-1 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-1">
        <button
          type="button"
          className={`flex items-center rounded-lg p-3 ring-1 hover:ring-brand-purplish-blue focus:outline-none focus:outline-brand-purplish-blue md:h-52 md:flex-col md:items-baseline md:justify-between md:rounded-xl md:p-5 ${
            errors.plan
              ? "ring-1 ring-brand-strawberry-red"
              : watch("plan") === "arcade"
                ? "bg-brand-magnolia ring-brand-purplish-blue"
                : "ring-brand-light-gray"
          }`}
          onClick={() => handleTogglePlan("arcade")}
        >
          <img
            src="/img/icon-arcade.svg"
            alt="arcade-icon"
            className={`${watch("billing") === "yearly" && "place-self-start"} h-10 md:h-14 md:place-self-start`}
          />
          <div className="ml-5 flex flex-col md:m-0">
            <h3 className="text-left">Arcade</h3>
            <p className="text-nowrap text-left text-sm md:text-base">
              {getValues("billing") === "yearly" ? "$90/yr" : "$9/mo"}
            </p>
            {watch("billing") === "yearly" && (
              <span className="text-left text-sm text-brand-marine-blue md:mt-2">
                2 months free
              </span>
            )}
          </div>
        </button>

        <button
          type="button"
          className={`group flex items-center rounded-lg p-3 ring-1 hover:ring-brand-purplish-blue focus:outline-none focus:outline-brand-purplish-blue md:h-52 md:flex-col md:items-baseline md:justify-between md:rounded-xl md:p-5 ${
            errors.plan
              ? "ring-1 ring-brand-strawberry-red"
              : watch("plan") === "advanced"
                ? "bg-brand-magnolia ring-brand-purplish-blue"
                : "ring-brand-light-gray"
          }`}
          onClick={() => handleTogglePlan("advanced")}
        >
          <img
            src="/img/icon-advanced.svg"
            alt="advanced-icon"
            className={`${watch("billing") === "yearly" && "place-self-start"} h-10 md:h-14 md:place-self-start`}
          />
          <div className="ml-5 flex flex-col group-hover:overflow-visible md:m-0">
            <h3 className="text-left">Advanced</h3>
            <p className="text-nowrap text-left text-sm md:text-base">
              {getValues("billing") === "yearly" ? "$120/yr" : "$12/mo"}
            </p>
            {watch("billing") === "yearly" && (
              <span className="text-left text-sm text-brand-marine-blue md:mt-2">
                2 months free
              </span>
            )}
          </div>
        </button>

        <button
          type="button"
          className={`flex items-center rounded-lg p-3 ring-1 hover:ring-brand-purplish-blue focus:outline-none focus:outline-brand-purplish-blue md:h-52 md:flex-col md:items-baseline md:justify-between md:rounded-xl md:p-5 ${
            errors.plan
              ? "ring-1 ring-brand-strawberry-red"
              : watch("plan") === "pro"
                ? "bg-brand-magnolia ring-brand-purplish-blue"
                : "ring-brand-light-gray"
          }`}
          onClick={() => handleTogglePlan("pro")}
        >
          <img
            src="/img/icon-pro.svg"
            alt="pro-icon"
            className={`${watch("billing") === "yearly" && "place-self-start"} h-10 md:h-14 md:place-self-start`}
          />
          <div className="ml-5 flex flex-col md:m-0">
            <h3 className="text-left">Pro</h3>
            <p className="text-nowrap text-left text-sm md:text-base">
              {getValues("billing") === "yearly" ? "$150/yr" : "$15/mo"}
            </p>
            {watch("billing") === "yearly" && (
              <span className="text-left text-sm text-brand-marine-blue md:mt-2">
                2 months free
              </span>
            )}
          </div>
        </button>
      </div>

      <div className="relative flex h-2 w-full">
        {errors.plan && (
          <span className="absolute left-0 right-0 mt-3 text-center text-sm font-bold text-brand-strawberry-red">
            {errors.plan.message}
          </span>
        )}
      </div>

      <div className="my-3 flex h-12 w-full items-center justify-center bg-brand-magnolia md:my-10">
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
