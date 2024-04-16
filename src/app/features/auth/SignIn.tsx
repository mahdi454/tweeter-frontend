import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiTwitterXLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { ArrowLeft, X } from "lucide-react";
import { string } from "zod";
import { useLoginMutation } from "@/app/api/authApi";
import usePersist from "@/hooks/usePersist";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const emailSchema = string()
  .min(1, "Email address is required")
  .email("Email Address is invalid");

export default function SignIn() {
  const [show, setShow] = useState(false);
  const [next, setNext] = useState(1);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      toast.success("You successfully logged in");
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (error: any) {
      if (!error.status) {
        toast.error("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Password");
      } else {
        toast.error(error.data?.message);
      }
      errRef.current?.focus();
    }
  };
  const handleNext = (
    e: React.FormEvent<HTMLFormElement>
    ) => {
    try {
      e.preventDefault();
      emailSchema.parse(email);
      setNext((pre) => pre + 1);
    } catch (error: any) {
      setErrMsg("Please provide a valid email!");
      errRef.current?.focus();
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-20">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[520px] sm:h-[620px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl">
        <div className="relative">
          {next === 1 ? (
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
        <div className="flex justify-center pt-4 text-3xl">
          <span>
            <RiTwitterXLine />
          </span>
        </div>
        {next === 1 && (
          <div className={`flex flex-col w-full mt-16`}>
            <div className="mx-auto ">
              <h1 className="text-[22px] font-black mb-7 ml-10 mx-52">
                Sign in to X
              </h1>
            </div>
            <form onSubmit={handleNext} className="flex flex-col gap-4 w-[300px] mx-auto">
              <div className="relative hover:opacity-75">
                <button className=" text-gray-700 w-full  bg-slate-200 border-slate-600 border py-2 pl-5 rounded-full hover:bg-slate-50 ">
                  Contentue with Google
                </button>
                <span className="text-[22px] absolute top-2.5 left-10  cursor-pointer">
                  <FcGoogle />
                </span>
              </div>
              <div className="relative mt-2 hover:opacity-75 ">
                <button className=" text-black w-full bg-slate-200 py-2 pl-5 rounded-full border-slate-600 border hover:bg-slate-50">
                  Sign up with Apple
                </button>
                <span className="text-black text-[23px] absolute top-2 left-14 cursor-pointer ">
                  <RiAppleFill />
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <div className="w-full  h-[1px] bg-slate-600" />
                <span>or</span>
                <div className="w-full  h-[1px] bg-slate-600" />
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="input peer"
                />
                <label htmlFor="email" className=" label ">
                  {" "}
                  Email
                </label>
                {errMsg && (
                  <span ref={errRef} className="text-red-700 pt-1">
                    {" "}
                    {errMsg}
                  </span>
                )}
              </div>
              <div className="relative mt-2 hover:opacity-75 ">
                <button
                  className=" text-black w-full bg-slate-200 py-1.5 pl-5 rounded-full hover:bg-slate-50 border border-slate-600 "
                >
                  Next
                </button>
              </div>
              <div className="relative mt-2 mb-10 ">
                <button className=" text-white w-full bg-black border border-slate-600 py-1.5 pl-5 rounded-full hover:bg-slate-900 active:bg-slate-900">
                  Forgot password?
                </button>
              </div>
              <p className="text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/login/sign-up"
                  className="text-sky-700 font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        )}
        {next === 2 && (
          <div className={`flex flex-col w-full mt-16`}>
            <div className="mx-auto ">
              <h1 className="text-[22px] font-black mb-7 ml-2 mx-24">
                Enter your password
              </h1>
            </div>
            <form className="flex flex-col gap-6 w-[400px] mx-auto px-5">
              <div className="relative  z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  defaultValue={email}
                  placeholder=""
                  className="input peer disabled:opacity-30"
                  disabled
                />
                <label htmlFor="email" className=" label ">
                  {" "}
                  Email
                </label>
              </div>
              <div className="relative  z-0 w-full group">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder=""
                  className="input peer"
                />
                <label htmlFor="password" className=" label ">
                  {" "}
                  Password
                </label>
                {errMsg && (
                  <span ref={errRef} className="text-red-700 pt-1">
                    {" "}
                    {errMsg}
                  </span>
                )}
              </div>
              <label htmlFor="persist" className="flex gap-1">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={() => setPersist(!persist)}
                  checked={persist}
                />
                Trust This Device
              </label>

              <div className="relative mt-10 hover:opacity-70 ">
                <button
                  className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2  rounded-full hover:bg-slate-50"
                  onClick={handleLogin}
                >
                  {isLoading ? (
                    <Loader
                      color="#0f93df"
                      loading={true}
                      circleSize={3}
                      isFull={false}
                      className="justify-center gap-5 py-2 "
                    />
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </div>
              <p className="text-slate-500 w-full ml-5 ">
                Don't have an account?{" "}
                <Link
                  to="/login/sign-up"
                  className="text-sky-600 font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
