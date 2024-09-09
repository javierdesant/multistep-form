import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormValues from "../../types/form.types";

export default function Step1() {
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col">
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <div className="mb-2 flex grow justify-between">
        <label htmlFor="name">Name</label>
        {errors.name && (
          <span className="text-sm font-bold text-brand-strawberry-red">
            {errors.name.message}
          </span>
        )}
      </div>
      <input
        type="text"
        id="name"
        placeholder="e.g. Stephen King"
        className={errors.name && "border-brand-strawberry-red"}
        {...register("name")}
      />

      <div className="mb-2 mt-5 flex grow justify-between">
        <label htmlFor="email">Email Address</label>
        {errors.email && (
          <span className="text-sm font-bold text-brand-strawberry-red">
            {errors.email.message}
          </span>
        )}
      </div>
      <input
        type="email"
        id="email"
        placeholder="e.g. stephenking@lorem.com"
        className={errors.email && "border-brand-strawberry-red"}
        {...register("email")}
      />

      <div className="mb-2 mt-5 flex grow justify-between">
        <label htmlFor="phone">Phone Number</label>
        {errors.phone && (
          <span className="text-sm font-bold text-brand-strawberry-red">
            {errors.phone.message}
          </span>
        )}
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            className={`phone-input ${errors.phone && "*:border-brand-strawberry-red"}`}
            value={value}
            onChange={onChange}
            defaultCountry="US"
            placeholder="e.g. +1 234 567 890"
          />
        )}
      />
    </div>
  );
}
