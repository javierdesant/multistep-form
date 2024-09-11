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

export { type Steps, type Addon };

export default FormValues;
