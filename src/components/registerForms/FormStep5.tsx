import { useFinishUserMutation } from "@/app/api/userApi";
import { UserType } from "@/components/registerForms/CreateUser";
import useFormFields from "@/hooks/useFormFields";
import { string } from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import { toast } from "react-toastify";
import Loader from "../Loader";

type Props = {
  setNext: Dispatch<SetStateAction<number>>;
  userField: UserType;
};

const passwordSchema = string()
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters");

const confirmPasswordSchema = string().min(1, "Please confirm your password");

export default function FormStep5({ setNext, userField }: Props) {
  const {
    password,
    confirmPassword,
    onConfirmPasswordChange,
    onPasswordChange,
  } = useFormFields(userField);
  const { email } = userField;
  const [clicked, setClicked] = useState(false);
  const { errors, setErrors, validateField } = useFormValidation();

  useEffect(() => {
    validateField(passwordSchema, "password", password);
  }, [password, clicked]);
  useEffect(() => {
    validateField(confirmPasswordSchema, "confirmPassword", confirmPassword);
  }, [confirmPassword, clicked]);

  const [finishUser, { isLoading }] = useFinishUserMutation();

  const onFinishUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setClicked(true);
      if (password !== confirmPassword) {
        // Passwords do not match, set error
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      const allErrors = { ...errors };
      const hasErrors = Object.values(allErrors).some((error) => error !== "");
      if (!hasErrors) {
        await finishUser({ email, password }).unwrap();

        toast.success("successfully created your password");
        setNext((pre) => pre + 1);
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));
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
          <h1 className="text-2xl font-black mx-auto">Provide your password</h1>
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
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <label htmlFor="password" className=" label ">
            {" "}
            Password
          </label>
          {errors && clicked && (
            <span className="text-red-700 pt-1"> {errors.password}</span>
          )}
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="password"
            name="confirmPwd"
            autoComplete="off"
            required
            placeholder=""
            className="input peer"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
          <label htmlFor="password" className=" label ">
            {" "}
            Confirm password
          </label>
          {errors && clicked && (
            <span className="text-red-700 pt-1"> {errors.confirmPassword}</span>
          )}
        </div>

        <div className="relative mt-5 ">
          <button
            className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50 disabled:bg-slate-200 disabled:cursor-not-allowed"
            onClick={onFinishUser}
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
              <span>Finish</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
