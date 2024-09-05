type ToggleSwitchProps = {
    value: string
    label1: string
    label2: string
}

export default function ToggleSwitch({ value, label1, label2 }: ToggleSwitchProps) {
  return (
    <div className="flex">
        <button id="checker1" role="label"
            className="font-medium text-base"
        >{label1}</button>
        <label className="cursor-pointer">
            <input type="checkbox" value={value} className="sr-only peer" />
            <div className="relative w-12 h-6 mx-6 bg-brand-marine-blue
                peer-focus:outline-none peer-focus:outline-brand-purplish-blue peer-focus:ring-blue-300 rounded-full peer 
                dark:bg-brand-marine-blue peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[24px] peer-checked:after:border-white 
                after:absolute after:top-[4px] after:start-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-4 after:w-4 after:transition-all" />
        </label>
        <button id="checker2" role="label"
            className="font-medium text-base"
        >{label2}</button>
    </div>
  )
}
