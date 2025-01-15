import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "../types";

// export const Auth = ({type}: {type: "signup" | "signin"}) => {
export const Auth = () => {
  const [postInput, setPostInput] = useState<SignupInput>({
    username: "",
    name: "",
    password: "",
  });
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="text-3xl font-bold">Create An Account</div>
            <div className="text-slate-400 text-center mb-2">
              Already Have an Account?
              <Link className="underline" to={"/signin"}>
                Login
              </Link>
            </div>
          </div>
          <LabelledInput
            label="Username"
            placeholder="Enter Username..."
            onChange={(e) => {
              setPostInput({
                ...postInput,
                username: e.target.value,
              });
            }}
          ></LabelledInput>

          <LabelledInput
            label="Name"
            placeholder="Enter Name..."
            onChange={(e) => {
              setPostInput({
                ...postInput,
                name: e.target.value,
              });
            }}
          ></LabelledInput>

          <LabelledInput
            label="Password"
            placeholder="Enter Password..."
            onChange={(e) => {
              setPostInput({
                ...postInput,
                password: e.target.value,
              });
            }}
          ></LabelledInput>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
};
