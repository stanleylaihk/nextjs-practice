"use client";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
});

type FormValues = {
  username: string;
  email: string;
};

const onSubmit = () => {};

const Page = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div className="container my-5 mx-auto">
      <h1 className="text-center text-3xl mb-5">
        React Hook Form intergrate w/ Yup
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
            <span className="p-2 text-slate-400">
              {errors.username?.message}
            </span>
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
            <span className="p-2 text-slate-400">{errors.email?.message}</span>
          </div>
          <button className="border rounded p-3">Submit</button>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </div>
  );
};

export default Page;
