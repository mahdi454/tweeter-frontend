import { ModeToggle } from "@/components/ModeToggle";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiTwitterXLine } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

export default function Login() {
  return (
    <>
      <Outlet />
      <MaxWidthWrapper>
        <div className="grid lg:grid-cols-12 lg:h-screen place-content-center  lg:space-x-16">
          <div className=" lg:col-span-6 lg:ml-20 flex items-center justify-between mt-5 ">
            <span className="text-4xl lg:text-[350px] lg:ml-10 ">
              <RiTwitterXLine />
            </span>
        
          </div>
          <div className="lg:col-span-6 ">
            <h1 className="text-5xl sm:text-6xl tracking-wider font-extrabold my-5">
              Happenning <br className="lg:hidden" />
              now
            </h1>
            <form className="flex flex-col  gap-4 w-72 ">
              <p className="text-2xl font-extrabold  ">Join today.</p>
              <div className="relative hover:opacity-75">
                <button className=" text-gray-700 w-full  bg-white py-2 pl-5 rounded-full  border border-slate-600">
                  Contentue with Google
                </button>
                <span className="text-[22px] absolute top-2.5 left-8  cursor-pointer">
                  <FcGoogle />
                </span>
              </div>
              <div className="relative hover:opacity-75">
                <button className=" text-black w-full bg-white py-2 pl-5 rounded-full  border border-slate-600">
                  Sign up with Apple
                </button>
                <span className="text-black text-[23px] absolute top-2 left-12 cursor-pointer">
                  <RiAppleFill />
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-full  h-[1px] bg-slate-600" />
                <span>or</span>
                <div className="w-full  h-[1px] bg-slate-600" />
              </div>
              <Link to="sign-up">
                <button className=" text-white w-full bg-sky-500 py-2 px-2 rounded-full hover:bg-sky-600 active:bg-sky-600">
                  Create account
                </button>
              </Link>
              <div>
                <p className="text-xs">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use.
                </p>
              </div>
              <div className="mt-2">
                <h2>Already have an account?</h2>
                <Link to="sign-in">
                  <button className="mt-3 text-sky-600 border border-slate-600 w-full py-2 px-2 rounded-full hover:opacity-70">
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
