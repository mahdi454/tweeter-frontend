import { useVerifyEmailMutation } from "@/app/api/userApi";
import { setCredentials } from "@/app/features/auth/authSlice";
import { UserType } from "@/components/registerForms/CreateUser";
import useFormFields from "@/hooks/useFormFields";
import useFormValidation from "@/hooks/useFormValidation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { string } from "zod";
import Loader from "../Loader";

type Props = {
  setNext: Dispatch<SetStateAction<number>>;
  userField: UserType;
};

const emailTokenSchema = string().length(6, "Must be 6 digits code");

export default function FormStep4({ setNext, userField }: Props) {
  const { email } = userField;
  const { emailToken, onEmailTokenChange } = useFormFields(userField);
  const [verifyEmail ,{isLoading}] = useVerifyEmailMutation();
  const dispatch = useDispatch();
  const { errors, validateField } = useFormValidation();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    validateField(emailTokenSchema, "emailToken", emailToken);
  }, [emailToken, clicked]);

  const onSubmitVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setClicked(true);
      const allErrors = { ...errors };
      const hasErrors = Object.values(allErrors).some((error) => error !== "");
      if (!hasErrors) {
        const { accessToken } = await verifyEmail({
          email,
          emailToken,
        }).unwrap();
        dispatch(setCredentials({ accessToken }));
        toast.success("successfully verified email!");
        setNext((pre) => pre + 1);
      }
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
      <form className="flex flex-col gap-6 w-[360px] px-5 sm:w-[400px] mx-auto">
        <div>
          <h1 className="text-xl font-black mx-auto">
            We sent you a emailToken
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
            onChange={(e) => onEmailTokenChange(e.target.value)}
          />
          <label htmlFor="password" className=" label ">
            {" "}
            Verification emailToken
          </label>
          <div className="w-full flex justify-between">
            {errors && clicked && (
              <span className="text-red-700 ml-1   text-sm">
                {errors.emailToken}
              </span>
            )}
            <Link
              to="#"
              className="flex  justify-end  text-sm text-sky-600 hover:underline "
            >
              Didn't receive email{" "}
            </Link>
          </div>
        </div>

        <div className="relative mt-5 ">
          <button
            disabled={!emailToken}
            className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed"
            onClick={onSubmitVerify}
          >
                {isLoading ? (
              <Loader
                color="#059af7"
                loading={true}
                circleSize={3}
                isFull={false}
                className="justify-center gap-5 py-2 "
              />
            ) : (
              <span>Next</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
