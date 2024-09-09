import { useFormContext } from "react-hook-form";
import FormValues, { Addon } from "../../types/form.types";

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
  monthlyPrice: `+${price}/mo`,
  yearlyPrice: `+${price * 10}/yr`,
});

export const addons: Addon[] = [
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

export default function Step3() {
  const { register, getValues } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col">
      <h1 className="my-4 md:mt-8">Pick add-ons</h1>
      <p className="mb-5 md:mb-10">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="grid grid-cols-1 grid-rows-3 gap-5">
        {addons.map((addon) => (
          <label
            htmlFor={`addons.${addon.name}`}
            className="cursor-pointer text-base"
          >
            <div className="group flex grow items-center justify-between rounded-xl border px-5 py-4 hover:border-brand-purplish-blue has-[:checked]:border-brand-purplish-blue has-[:checked]:bg-brand-magnolia">
              <input
                type="checkbox"
                className="mr-5 size-5 rounded text-brand-purplish-blue"
                id={`addons.${addon.name}`}
                {...register(`addons.${addon.name}`)}
              />
              <div className="flex grow flex-col">
                <h2 className="font-medium">{addon.title}</h2>
                <p>{addon.description}</p>
              </div>
              <span className="text-right text-brand-purplish-blue">
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
