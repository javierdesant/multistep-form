import { z } from "zod";
import { formDataSchema } from "../lib/schema";

type FormValues = z.infer<typeof formDataSchema>;

type Step = {
  id: `step-${number}`;
  name: string;
  fields: (keyof FormValues)[];
};

type Steps = [{ id: "complete"; name: "Complete"; fields: [] }, ...Step[]];

type Addon = {
  name: keyof FormValues["addons"];
  title: string;
  description: string;
  price: number;
  monthlyPrice: `+${string}/mo`;
  yearlyPrice: `+${string}/yr`;
};

type Plan = {
  name: FormValues["plan"];
  icon: `icon-${FormValues["plan"]}.svg`;
  price: number;
  monthlyPrice: `+${string}/mo`;
  yearlyPrice: `+${string}/yr`;
};

type Plans = [Plan, Plan, Plan]

type Addons = Addon[]

export { type Steps, type Addon, type Addons, type Plan, type Plans };

export default FormValues;
