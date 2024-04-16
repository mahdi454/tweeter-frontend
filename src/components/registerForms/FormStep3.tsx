import { useCreateNewUserMutation } from "@/app/api/userApi";
import { UserType } from "@/components/registerForms/CreateUser";
import { CheckCircle2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

type Props = {
  setNext: Dispatch<SetStateAction<number>>;
  userField: UserType;
};

export default function FormStep3({ setNext, userField }: Props) {
  const { name, email, date } = userField;
  const [createNewUser, { isLoading }] = useCreateNewUserMutation();
  const onCreateUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
     e.preventDefault()
      await createNewUser({ name, email,birthDate:date }).unwrap();
      toast.success("OTP sent successfully");
      setNext((pre) => pre + 1);
    } catch (error: any) {
      if (!error.status) {
        toast.error("No Server Response");
      } else {
        toast.error(error.data?.message);
      }
    }
  };
  return (
    <div className={` flex flex-col w-full mt-14`}>
      <form onSubmit={onCreateUser}
        className="flex flex-col gap-4 w-[360px] sm:w-[400px] px-5 mx-auto"
      >
        <div>
          <h1 className="text-3xl font-black mx-auto">Create your account</h1>
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="text"
            name="name"
            autoComplete="off"
            required
            placeholder=""
            className="input peer"
            defaultValue={name}
            onFocus={() => setNext(1)}
          />
          <label htmlFor="name" className=" label ">
            {" "}
            Name
          </label>
          <span className="absolute top-6 right-3 text-xl text-green-500 -z-10">
            <CheckCircle2 />
          </span>
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="text"
            name="email"
            autoComplete="off"
            required
            placeholder=""
            className="input peer"
            defaultValue={email}
            onFocus={() => setNext(1)}
          />
          <label htmlFor="email" className=" label ">
            {" "}
            Email
          </label>
          <span className="absolute top-6 right-3  text-green-500 -z-10">
            <CheckCircle2 />
          </span>
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="text"
            name="date"
            autoComplete="off"
            required
            placeholder=""
            className="input peer"
            defaultValue={date}
            onFocus={() => setNext(1)}
          />
          <label htmlFor="date" className=" label ">
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
            . X may use your contact information, including your email address
            and phone number for purposes outlined in our Privacy Policy.{" "}
            <Link to="#" className="text-sky-600 hover:underline">
              Learn more
            </Link>
          </p>
        </div>

        <div className="relative mt-4 ">
          <button className=" text-white w-full text-lg bg-sky-500 border border-slate-600 py-2 pl-5 rounded-full hover:bg-sky-600"
          
          >
            {isLoading ? (
              <Loader
                color="#f4f9fc"
                loading={true}
                circleSize={3}
                isFull={false}
                className="justify-center gap-5 py-2 "
              />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
