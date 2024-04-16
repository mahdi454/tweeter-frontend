import { ArrowLeft, X } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormStep1 from "./FormStep1";
import Welcome from "@/components/registerForms/Welcome";
import FormStep3 from "@/components/registerForms/FormStep3";
import FormStep4 from "@/components/registerForms/FormStep4";
import FormStep5 from "@/components/registerForms/FormStep5";

export type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPwd: string;
  emailToken: string;
  date: string;
};
const initUser: UserType = {
  name: "",
  email: "",
  password: "",
  confirmPwd: "",
  emailToken: "",
  date: "",
};

export default function CreateUser() {
  const [show, setShow] = useState(false);
  const [setp, setStep] = useState(1);
  const [userFieldValue, setUserFieldValue] = useState(initUser);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-20">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[520px] sm:h-[620px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl">
        <div className="relative">
          {setp <= 1 ? (
            <button
              className="absolute text-2xl  top-3 left-3 p-1.5 hover:bg-slate-300 rounded-full dark:hover:bg-slate-800"
              onClick={() => {
                setShow(!show), navigate("..");
              }}
            >
              <X />
            </button>
          ) : (
            <button
              className="absolute text-2xl  top-3 left-3 p-1.5 hover:bg-slate-300 dark:hover:bg-slate-800 rounded-full"
              onClick={() => {
                setStep((pre) => pre - 1);
              }}
            >
              <ArrowLeft />
            </button>
          )}
        </div>
        <div className="pl-8  pt-4">
          <h1 className="text-[20px] font-black mb-7 ml-6 mx-52">
            Step {setp} of 5
          </h1>
        </div>
        {setp === 1 && (
          <FormStep1 setNext={setStep} setUserField={setUserFieldValue} userField={userFieldValue}/>
        )}
        {setp === 2 && (
          <FormStep3 setNext={setStep} userField={userFieldValue} />
          )}
        {setp === 3 && (
          <FormStep4 setNext={setStep} userField={userFieldValue} />
          )}
        {setp === 4 && <FormStep5 userField={userFieldValue} setNext={setStep} />}
          {setp === 5 && <Welcome userField={userFieldValue}/>}
      </div>
    </div>
  );
}
