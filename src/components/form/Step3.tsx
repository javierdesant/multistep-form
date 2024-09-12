import { useFormContext } from "react-hook-form";
import FormValues, { Addon } from "../../types/form.types";

type Step3Props = {
  addons: Addon[];
};

export default function Step3({ addons }: Step3Props) {
  const { register, getValues } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col">
      <h1 className="my-3 md:mt-8">Pick add-ons</h1>
      <p className="mb-5 md:mb-10">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="mb-4 grid grid-cols-1 grid-rows-3 gap-3 md:gap-5">
        {addons.map((addon) => (
          <label
            htmlFor={`addons.${addon.name}`}
            className="cursor-pointer text-base"
            key={addon.name}
          >
            <div className="group flex h-full grow items-center justify-between rounded-xl border px-4 py-3 hover:border-brand-purplish-blue has-[:checked]:border-brand-purplish-blue has-[:checked]:bg-brand-magnolia md:px-5 md:py-4">
              <input
                type="checkbox"
                className="mr-3 size-5 rounded text-brand-purplish-blue md:mr-5"
                id={`addons.${addon.name}`}
                {...register(`addons.${addon.name}`)}
              />
              <div className="flex grow flex-col">
                <h2 className="font-medium">{addon.title}</h2>
                <p className="text-xs md:text-base">{addon.description}</p>
              </div>
              <span className="text-nowrap text-right text-sm text-brand-purplish-blue md:text-base">
                {getValues("billing") === "yearly"
                  ? addon.yearlyPrice
                  : addon.monthlyPrice}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
