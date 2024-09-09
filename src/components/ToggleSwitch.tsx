type ToggleSwitchProps = {
  value: string;
  onChange: (value: string) => void;
  label1: string;
  label2: string;
};

export default function ToggleSwitch({
  value,
  onChange,
  label1,
  label2,
}: ToggleSwitchProps) {
  const isChecked = value === "yearly";

  return (
    <div className="flex">
      <button
        id="checker1"
        type="button"
        role="label"
        className="text-base font-medium hover:underline"
        onClick={() => onChange("monthly")}
      >
        {label1}
      </button>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          id="switch"
          checked={isChecked}
          className="peer sr-only"
          onChange={(e) => onChange(e.target.checked ? "yearly" : "monthly")}
        />
        <div className="peer relative mx-6 h-6 w-12 rounded-full bg-brand-marine-blue after:absolute after:start-[6px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-[20px] peer-checked:after:border-white peer-focus:outline-none peer-focus:outline-brand-purplish-blue peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-[24px] dark:bg-brand-marine-blue" />
      </label>
      <button
        id="checker2"
        type="button"
        role="label"
        className="text-base font-medium hover:underline"
        onClick={() => onChange("yearly")}
      >
        {label2}
      </button>
    </div>
  );
}
