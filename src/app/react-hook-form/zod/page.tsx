"use client";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .trim()
    .nonempty("Username is required")
    .min(2, { message: "Username must be 2 or more characters long" }),
  email: z
    .string()
    .toUpperCase()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, { message: "Only numbers are allowed" })
    .transform(
      (val) => `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`
    ),
});

type FormValues = {
  username: string;
  email: string;
  phone: number;
};

// const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
const onSubmit = (data: FormValues) => {
  console.log("Form submitted", data);
};

const Page = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div className="container my-5 mx-auto">
      <h1 className="text-center text-3xl mb-5">
        React Hook Form intergrate w/ Zod
      </h1>
      <div className="border rounded-md p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="username" className="p-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded p-2"
              {...register("username")}
            />
            {errors.username && (
              <span className="p-2 text-slate-400">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="p-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded p-2"
              {...register("email")}
            />
            {errors.email && (
              <span className="p-2 text-slate-400">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="p-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="border rounded p-2"
              {...register("phone")}
            />
            <span className="p-2 text-slate-400">{errors.phone?.message}</span>
          </div>
          <button className="border rounded p-3">Submit</button>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </div>
  );
};

export default Page;
