import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "../types";
import { SignIn } from "../pages/signin";
import { SignUp } from "../pages/signup";
import axios from "axios";
import { BACKEND_URL } from "../config";

// export const Auth = ({type}: {type: "signup" | "signin"}) => {
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInput
      );
      const jwt = response.data.token;
      console.log("Token Test "+jwt);
      localStorage.setItem("token", jwt);
      if(jwt){
        navigate("/blogs");
      }
    } catch (error) {
      alert("Error while Signin" + error);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-8">
            <div className="text-3xl font-bold">
              {type === "signup" ? "Create an account" : "Login to account"}
            </div>
            <div className="text-slate-400 text-center">
              Already Have an Account?
              <Link
                className="underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "SignIn" : "SignUp"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <LabelledInput
              label="Email"
              placeholder="Enter Email..."
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  email: e.target.value,
                });
              }}
            ></LabelledInput>

            {type === "signup" ? (
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
            ) : null}
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter Password..."
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            ></LabelledInput>
            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
            rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
             dark:border-gray-700 w-full mt-8"
            >
              {type === "signup" ? "SignUp" : "SignIn"}
            </button>
          </div>
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
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-2">
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
