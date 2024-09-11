import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "../../lib/schema.ts";
import CompleteStep from "./CompleteStep.tsx";
import FormValues, { Addon, Plan, Steps } from "../../types/form.types.ts";
import Step1 from "./Step1.tsx";
import Step2 from "./Step2.tsx";
import Step3 from "./Step3.tsx";
import Step4 from "./Step4.tsx";
import { formatCurrency } from "../../helpers/index.ts";

const steps: Steps = [
  { id: "complete", name: "Complete", fields: [] },
  { id: "step-1", name: "Your info", fields: ["name", "email", "phone"] },
  { id: "step-2", name: "Select plan", fields: ["plan"] },
  { id: "step-3", name: "Add-ons", fields: ["billing"] },
  { id: "step-4", name: "Summary", fields: ["addons"] },
];

const createPlan = (name: FormValues["plan"], price: number): Plan => ({
  name,
  icon: `icon-${name}.svg`,
  price,
  monthlyPrice: `+${formatCurrency(price)}/mo`,
  yearlyPrice: `+${formatCurrency(price * 10)}/yr`,
});

const plans: Plan[] = [
  createPlan("arcade", 9),
  createPlan("advanced", 12),
  createPlan("pro", 15),
];

const createAddon = (
  name: keyof FormValues["addons"],
  title: string,
  description: string,
  price: number,
): Addon => ({
  name,
  title,
  description,
  price,
  monthlyPrice: `+${formatCurrency(price)}/mo`,
  yearlyPrice: `+${formatCurrency(price * 10)}/yr`,
});

const addons: Addon[] = [
  createAddon(
    "onlineService",
    "Online service",
    "Access to multiplayer games",
    1,
  ),
  createAddon("largerStorage", "Larger storage", "Extra 1TB of cloud save", 2),
  createAddon(
    "customizableProfile",
    "Customizable profile",
    "Custom theme on your profile",
    2,
  ),
];

const LAST_STEP = steps.length - 1;
const COMPLETE_STEP = 0;

export default function Form() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "arcade",
      billing: "monthly",
      addons: {
        customizableProfile: false,
        largerStorage: false,
        onlineService: false,
      },
    },
    resolver: zodResolver(formDataSchema),
  });

  const onSubmit = useCallback((data: FormValues) => {
    const selectedAddons = Object.fromEntries(
      Object.entries(data.addons).filter(([_, value]) => value),
    );

    const filteredData = {
      ...data,
      addons: selectedAddons,
    };

    window.alert(JSON.stringify(filteredData, null, 4));
    setCurrentStep(COMPLETE_STEP);
  }, []);

  const onError = useCallback((values: FormValues) => {
    window.alert("ERROR:\n" + JSON.stringify(values, null, 4));
  }, []);

  const handleNav = async (index: number) => {
    let isValid = true;
    let failedStep = currentStep;
    for (let i = currentStep; i <= index && isValid; i++) {
      isValid = await methods.trigger(steps[i].fields);
      if (!isValid) {
        failedStep = i;
      }
    }

    if (isValid) {
      setCurrentStep(index);
    } else {
      setCurrentStep(failedStep);
    }
  };

  return (
    <>
      <div className="fixed top-0 flex h-full w-full bg-sidebar-mobile bg-contain bg-top bg-no-repeat p-5 pt-7 md:hidden" />
      <div className="my-5 flex space-x-4 md:hidden">
        {steps.map(
          (step, index) =>
            index !== COMPLETE_STEP && (
              <div className="z-20 my-3 ml-2 flex items-center" key={step.id}>
                <button
                  id={step.id}
                  disabled={
                    `step-${currentStep}` === step.id ||
                    currentStep === COMPLETE_STEP
                  }
                  className={`size-9 rounded-full border font-bold ${currentStep === index ? "bg-brand-pastel-blue text-brand-marine-blue" : "text-brand-alabaster"}`}
                  onClick={() => handleNav(index)}
                >
                  {index}
                </button>
              </div>
            ),
        )}
      </div>

      <div className="z-10 flex w-full max-w-[350px] rounded-xl bg-white p-4 shadow-xl md:h-full md:max-h-[600px] md:max-w-[1050px] md:rounded-2xl">
        <div className="hidden min-w-[274px] flex-col rounded-xl bg-sidebar-desktop bg-cover bg-bottom bg-no-repeat p-5 pt-7 md:visible md:flex">
          {steps.map(
            (step, index) =>
              index !== COMPLETE_STEP && (
                <div className="my-3 ml-2 flex items-center" key={step.id}>
                  <button
                    id={step.id}
                    disabled={
                      `step-${currentStep}` === step.id ||
                      currentStep === COMPLETE_STEP
                    }
                    className={`size-8 rounded-full border text-sm font-bold ${currentStep === index ? "bg-brand-pastel-blue text-brand-marine-blue" : "text-brand-alabaster"}`}
                    onClick={() => handleNav(index)}
                  >
                    {index}
                  </button>
                  <div className="ml-5 flex flex-col items-baseline uppercase">
                    <span className="text-xs text-brand-light-gray">
                      Step {index}
                    </span>
                    <span className="font-bold tracking-wider text-brand-alabaster">
                      {step.name}
                    </span>
                  </div>
                </div>
              ),
          )}
        </div>

        <FormProvider {...methods}>
          <form
            className="flex grow flex-col px-4 md:px-24"
            onSubmit={methods.handleSubmit(onSubmit)}
            onError={() => onError}
            noValidate
          >
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 plans={plans} />}
            {currentStep === 3 && <Step3 addons={addons} />}
            {currentStep === 4 && (
              <Step4 plans={plans} addons={addons} handleNav={handleNav} />
            )}

            {currentStep === COMPLETE_STEP && <CompleteStep />}

            <div className="fixed bottom-0 left-0 right-0 flex w-full justify-between bg-white px-5 py-3 md:static md:mb-4 md:mt-auto md:p-0">
              <button
                disabled={currentStep === 1 || currentStep === COMPLETE_STEP}
                type="button"
                className="my-3 flex w-min text-nowrap font-medium text-brand-cool-gray hover:text-brand-marine-blue disabled:invisible"
                onClick={() => {
                  handleNav(currentStep - 1);
                }}
              >
                Go Back
              </button>
              <button
                disabled={
                  currentStep === LAST_STEP || currentStep === COMPLETE_STEP
                }
                type="button"
                className="flex w-min text-nowrap rounded-md bg-brand-marine-blue px-6 py-3 font-medium text-brand-magnolia hover:bg-blue-900 disabled:hidden md:rounded-lg"
                onClick={() => {
                  handleNav(currentStep + 1);
                }}
              >
                Next Step
              </button>
              <button
                disabled={currentStep !== LAST_STEP}
                type="submit"
                className="flex w-min text-nowrap rounded-md bg-brand-purplish-blue px-7 py-3 font-medium text-brand-magnolia hover:opacity-70 disabled:hidden md:rounded-lg"
              >
                Confirm
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
