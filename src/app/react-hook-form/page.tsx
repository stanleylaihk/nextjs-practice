"use client";
import React, { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import Link from "next/link";

let renderCount = 0;

type FormValues = {
  username: string;
  name: string;
  email: string;
  social: {
    // nested
    twitter: string;
    facebook: string;
  };
  phone: string[]; // array field
  address: {
    street: string;
  }[]; // Dynamic field
  age: number;
  dob: Date;
};

const page = () => {
  const form = useForm<FormValues>({
    // defaultValues: {
    //   username: "default username",
    //   email: "",
    // },
    defaultValues: async () => {
      const response = await fetch("api/fetchJSON/1");
      const data = await response.json();
      return {
        username: "default",
        name: "",
        email: data.email,
        social: {
          twitter: "",
          facebook: "",
        },
        phone: ["", ""],
        address: [{ street: "" }],
        age: 0,
        dob: new Date(),
      };
    },
    mode: "onBlur", // default onSubmit, option: onTouch, onChange, all(blur+change)
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  // Dynamic field e.g. address
  const { fields, append, remove } = useFieldArray({
    name: "address",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form Errors", errors);
  };

  const handleGetValues = () => {
    // console.log("Get values", getValues());
    console.log("Get values", getValues(["social", "social.twitter"]));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      //optional
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  // Watch: would rerender the page
  const watchUsername = watch(["username"]);
  const watchForm = watch();

  // useEffect(() => {
  //   // reset
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // });

  // useEffect(() => {
  // watch would not rerender the page
  // const subscription = watch((value) => {
  //   console.log(value);
  // });

  // return () => subscription.unsubscribe();
  // }, [watch]);

  renderCount++;

  return (
    <>
      <h1 className="text-center text-3xl p-2.5">React Hook Form - Demo</h1>
      <div className="text-center pb-5 space-x-2">
        <Link href="/react-hook-form/yup" className="border rounded p-2">
          intergrate Yup
        </Link>
        <Link href="/react-hook-form/zod" className="border rounded p-2">
          intergrate Zod
        </Link>
      </div>
      <div className="container border rounded-md mx-auto p-3 my-3">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="username" className="p-2">
              Username
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="username"
              {...register("username", { required: "Username is reuired" })}
            />
            <span className="p-2 text-slate-400">
              {errors.username?.message}
            </span>
          </div>
          <div>
            <label htmlFor="name" className="p-2">
              Name
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="name"
              {...register("name", { required: "Name is reuired" })}
            />
            <span className="p-2 text-slate-400">{errors.name?.message}</span>
          </div>
          <div>
            <label htmlFor="email" className="p-2">
              Email
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="email"
              {...register("email", {
                required: "Email is reuired",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid Email format",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@exmaple.com" ||
                      "Enter a different email address"
                    );
                  },
                  notBlackListed: (fieldValue) => {
                    return (
                      !fieldValue.endsWith("blacklist.com") ||
                      "This domain is not support"
                    );
                  },
                  emailAvailable: async (fieldValue) => {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                    );
                    const data = await response.json();
                    return data.length == 0 || "Email already exists";
                  },
                },
              })}
            />
            <span className="p-2 text-slate-400">{errors.email?.message}</span>
          </div>
          <div>
            <label htmlFor="twitter" className="p-2">
              Twitter
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="twitter"
              {...register("social.twitter", { disabled: true })}
            />
          </div>
          <div>
            <label htmlFor="facebook" className="p-2">
              Facebook
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="facebook"
              {...register("social.facebook")}
            />
          </div>
          <div>
            <label htmlFor="primary-phone" className="p-2">
              Primary Phone
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="primary-phone"
              {...register("phone.0")}
            />
          </div>
          <div>
            <label htmlFor="secondary-phone" className="p-2">
              Secondary Phone
            </label>
            <input
              type="text"
              className="border rounded p-1"
              id="secondary-phone"
              {...register("phone.1")}
            />
          </div>
          <div>
            <label htmlFor="age" className="p-2">
              Age
            </label>
            <input
              type="number"
              className="border rounded p-1 text-right"
              id="age"
              {...register("age", {
                valueAsNumber: true,
                required: { value: true, message: "Age is reuired" },
              })}
            />
          </div>
          <div>
            <label htmlFor="dob" className="p-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="border rounded p-1"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: { value: true, message: "Date of Birth is reuired" },
              })}
            />
          </div>
          <div>
            <label className="p-2">List of addresses</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <input
                      type="text"
                      className="border rounded p-1 mb-3"
                      {...register(`address.${index}.street` as const)} // as const for TS
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="border rounded p-1 ml-3"
                        onClick={() => remove(index)}
                      >
                        Remove address
                      </button>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                className="border rounded p-1"
                onClick={() => append({ street: "" })}
              >
                Add address
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-10">
            <button
              type="submit"
              className="border rounded p-3 disabled:opacity-25"
              // disabled={!isDirty || !isValid || isSubmitting}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={
                () => reset() // reset to default
              }
              className="border rounded p-3"
            >
              Reset
            </button>
            <button
              onClick={handleGetValues}
              type="button"
              className="border rounded p-3"
            >
              Get Value
            </button>
            <button
              onClick={handleSetValue}
              type="button"
              className="border rounded p-3"
            >
              Set Value
            </button>
            <button
              onClick={() => trigger("email")}
              type="button"
              className="border rounded p-3"
            >
              Validate email
            </button>
            <button
              onClick={() => trigger()}
              type="button"
              className="border rounded p-3"
            >
              Validate Form
            </button>
          </div>
        </form>
        <div className="bg-slate-100 p-3 mt-3 rounded-lg">
          <div>Render Count: {renderCount}</div>
          <div>Submit Count: {submitCount}</div>
          <div>Watched Username: {JSON.stringify(watchUsername)}</div>
          <div>Watched Value: {JSON.stringify(watchForm)}</div>
          <DevTool control={control} />
        </div>
      </div>
    </>
  );
};

export default page;
