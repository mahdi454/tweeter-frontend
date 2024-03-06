import { ArrowLeft, CheckCircle2, ChevronDown, X } from "lucide-react";

import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateNewUserMutation, useFinishUserMutation, useVerifyEmailMutation } from "./usersSlice";

type UserType = {
  username: string;
  email: string;
  password: string;
  confirmPwd: string;
  emailToken: string;
};
const initUser: UserType = {
  username: "",
  email: "",
  password: "",
  confirmPwd: "",
  emailToken: "",
};
type Date = {
  month: string;
  day: string;
  year: string;
};
const initDate: Date = {
  month: "",
  day: "",
  year: "",
};

export default function CreateUser() {
  const [show, setShow] = useState(false);
  const [next, setNext] = useState(1);
  const [userField, setUserField] = useState(initUser);
  const [date, setDate] = useState(initDate);
  const { month, day, year } = date;
  const { username, email, password, confirmPwd, emailToken } = userField;
  const [createNewUser] = useCreateNewUserMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [finishUser] = useFinishUserMutation();
  const navigate = useNavigate();
  const handleDate = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDate({ ...date, [name]: value });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserField({ ...userField, [name]: value });
  };
  const onCreateUser = async () => {
    try {
      await createNewUser({ username, email }).unwrap();
    } catch (error) {
      console.error("failed to create new user", error);
    }
  };
  const onSubmitVerify = async () => {
    try {
      await verifyEmail({email,emailToken }).unwrap()
    } catch (error) {
      console.error("failed verify OTP", error);
    }
  };
  const onFinishUser = async () => {
    try {
      await finishUser({email,password }).unwrap()
      navigate("/")
    } catch (error) {
      console.error("failed to add password", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-20">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[520px] sm:h-[620px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl">
        <div className="relative">
          {next <= 1 ? (
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
                setNext((pre) => pre - 1);
              }}
            >
              <ArrowLeft />
            </button>
          )}
        </div>
        <div className="pl-8  pt-4">
          <h1 className="text-[20px] font-black mb-7 ml-6 mx-52">
            Step {next} of 5
          </h1>
        </div>
        {next === 1 && (
          <div className={` flex flex-col w-full mt-14`}>
            <form className="flex flex-col gap-4 w-[360px] sm:w-[400px] mx-auto px-5">
              <div>
                <h1 className="text-2xl font-black mx-auto ">
                  Create your account
                </h1>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  value={username}
                  onChange={handleChange}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Name
                </label>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email" className=" label ">
                  {" "}
                  Email
                </label>
              </div>
              <div className="mt-4">
                <p>Date of birth</p>
                <p className="text-[13.5px] text-slate-500">
                  This will not be shown publicly. Confirm your own age, even if
                  this account is for a business, a pet, or something else.
                </p>
              </div>
              <div className="flex gap-2 w-full -translate-y-2">
                <div className="relative flex-1 z-0 ">
                  <select
                    className=" bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-6 pb-2 pt-6  rounded-md appearance-none peer "
                    value={month}
                    name="month"
                    onChange={handleDate}
                    required
                  >
                    <option className="bg-gray-300 dark:bg-black"></option>
                    <option className="bg-gray-300 dark:bg-black" value="Jan">
                      January
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Feb">
                      Fabuary
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Mar">
                      March
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Apr">
                      April
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="May">
                      May
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Jun">
                      June
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Jul">
                      July
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Aug">
                      Agust
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Sep">
                      September
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Oct">
                      October
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Nov">
                      November
                    </option>
                    <option className="bg-gray-300 dark:bg-black" value="Dec">
                      December
                    </option>
                  </select>
                  <label
                    htmlFor="month"
                    className="absolute top-1.5 left-2.5 mb-2 duration-300 transform text-sm font-medium text-slate-600 peer-focus:text-sky-600  -z-10"
                  >
                    Month
                  </label>
                  <span className="absolute text-slate-500 top-3 left-20 texsl peer-focus:text-sky-500 -z-10">
                    <ChevronDown />
                  </span>
                </div>
                <div className="relative z-0">
                  <select
                    className="block bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-14 pb-2 pt-6  rounded-md appearance-none peer "
                    value={day}
                    name="day"
                    onChange={handleDate}
                    required
                  >
                    <option></option>
                    {Array(30)
                      .fill(null)
                      .map((_u, i) => (
                        <option
                          key={i}
                          className="bg-gray-300 dark:bg-black"
                          value={i}
                        >
                          {i + 1}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="day"
                    className="absolute top-1.5 left-2.5 mb-2 text-sm font-medium text-slate-500 peer-focus:text-sky-600 -z-10 "
                  >
                    Day
                  </label>
                  <span className="absolute top-3 left-14 text-slate-500 peer-focus:text-sky-500 -z-10">
                    <ChevronDown />
                  </span>
                </div>
                <div className="relative z-0">
                  <select
                    className="block bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-12 pb-2 pt-6  rounded-md appearance-none peer "
                    value={year}
                    name="year"
                    onChange={handleDate}
                    required
                  >
                    <option></option>
                    {Array(50)
                      .fill(null)
                      .map((_u, i) => (
                        <option
                          key={i}
                          className="bg-gray-300 dark:bg-black"
                          value={2023 - i}
                        >
                          {2023 - i}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="year"
                    className="absolute top-1.5 left-2.5 mb-2 text-sm font-medium text-slate-500 peer-focus:text-sky-600 -z-10 "
                  >
                    Year
                  </label>
                  <span className="absolute top-3 left-16 text-slate-500 peer-focus:text-sky-500 -z-10">
                    <ChevronDown />
                  </span>
                </div>
              </div>
              <div className="relative mt-5 ">
                <button
                  disabled={
                    !username ||
                    !email ||
                    !date.day ||
                    !date.month ||
                    !date.year
                  }
                  className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50  disabled:bg-slate-200 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.preventDefault();
                    setNext((pre) => pre + 1);
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {next === 2 && (
          <div>
            <div className="px-10 sm:px-16">
              {" "}
              <h1 className="text-xl font-black mx-auto">
                Customize your experience
              </h1>
              <h2 className="text-lg font-medium my-5">
                Track where you see X content across the web
              </h2>
            </div>
            <div className=" relative px-10 sm:px-16">
              <p className="text-[14px] w-11/12">
                X uses this data to personalize your experience. This web
                browsing history will never be stored with your name, email, or
                phone number.
              </p>
              <input type="checkbox" className="absolute top-1 right-14  " />
            </div>
            <div className="px-10 sm:px-16 mt-10 text-slate-500 text-[13px]">
              <p>
                By signing up, you agree to our Terms,{" "}
                <Link to="#" className="text-sky-600 hover:underline">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link to="#" className="text-sky-600 hover:underline">
                  Cookie Use
                </Link>
                . X may use your contact information, including your email
                address and phone number for purposes outlined in our Privacy
                Policy.{" "}
                <Link to="#" className="text-sky-600 hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="relative px-10 sm:px-16 mt-16 ">
              <button
                className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50"
                onClick={(e) => {
                  e.preventDefault();
                  setNext((pre) => pre + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {next === 3 && (
          <div className={` flex flex-col w-full mt-14`}>
            <form       
              className="flex flex-col gap-4 w-[360px] sm:w-[400px] px-5 mx-auto"
            >
              <div>
                <h1 className="text-3xl font-black mx-auto">
                  Create your account
                </h1>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="text"
                  name="password"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  defaultValue={username}
                  onFocus={() => setNext(1)}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Name
                </label>
                <span className="absolute top-6 right-3 text-xl text-green-500 -z-10">
                  <CheckCircle2 />
                </span>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="email"
                  name="password"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  defaultValue={email}
                  onFocus={() => setNext(1)}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Email
                </label>
                <span className="absolute top-6 right-3  text-green-500 -z-10">
                  <CheckCircle2 />
                </span>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="email"
                  name="password"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  defaultValue={`${month} ${day}, ${year}`}
                  onFocus={() => setNext(1)}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Date of birth
                </label>
                <span className="absolute top-6 right-3 text-xl text-green-500 -z-10">
                  <CheckCircle2 />
                </span>
              </div>
              <div className="  text-slate-500 text-[14px]">
                <p>
                  By signing up, you agree to our Terms,{" "}
                  <Link to="#" className="text-sky-600 hover:underline">
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link to="#" className="text-sky-600 hover:underline">
                    Cookie Use
                  </Link>
                  . X may use your contact information, including your email
                  address and phone number for purposes outlined in our Privacy
                  Policy.{" "}
                  <Link to="#" className="text-sky-600 hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="relative mt-4 ">
                <button
                  className=" text-white w-full text-lg bg-sky-500 border border-slate-600 py-2 pl-5 rounded-full hover:bg-sky-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setNext((pre) => pre + 1);
                    onCreateUser();
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        )}
        {next === 4 && (
          <div className={` flex flex-col w-full mt-14`}>
            <form className="flex flex-col gap-6 w-[360px] px-5 sm:w-[400px] mx-auto">
              <div>
                <h1 className="text-3xl font-black mx-auto">
                  We send you a emailToken
                </h1>
                <p className="text-slate-500 mt-1">
                  Enter it below to verify {email}.
                </p>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="text"
                  name="emailToken"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  value={emailToken}
                  onChange={handleChange}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Verification emailToken
                </label>
                <Link to="#" className="text-sm text-sky-600 hover:underline">
                  Didn't receive email{" "}
                </Link>
              </div>

              <div className="relative mt-5 ">
                <button
                  disabled={!emailToken}
                  className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.preventDefault();
                    setNext((pre) => pre + 1);
                    onSubmitVerify()
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {next === 5 && (
          <div className={` flex flex-col w-full mt-14`}>
            <form className="flex flex-col gap-6 w-[360px] px-5 sm:w-[400px] mx-auto">
              <div>
                <h1 className="text-2xl font-black mx-auto">
                  Provide your password
                </h1>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Password
                </label>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="password"
                  name="confirmPwd"
                  autoComplete="off"
                  required
                  placeholder=""
                  className="input peer"
                  value={confirmPwd}
                  onChange={handleChange}
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Confirm password
                </label>
              </div>

              <div className="relative mt-5 ">
                <button
                  className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed"
                  disabled={!password || !confirmPwd || password !== confirmPwd}
                  onClick={(e) => {
                    e.preventDefault();
                    onFinishUser()
                  }}
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
