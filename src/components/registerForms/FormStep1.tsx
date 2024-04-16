import { UserType } from "@/components/registerForms/CreateUser";
import useFormFields from "@/hooks/useFormFields";
import useFormValidation from "@/hooks/useFormValidation";
import { formatDate } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { string } from "zod";
type Props = {
  setNext: Dispatch<SetStateAction<number>>;
  setUserField: Dispatch<SetStateAction<UserType>>;
  userField: UserType;
};
const emailSchema = string()
  .min(1, "Email address is required")
  .email("Email Address is invalid");
const userNameSchema = string().min(1, "Username is required");
const yearSchema = string().min(1, "Required ");
const daySchema = string().min(1, "Required ");
const monthSchema = string().min(1, "Required ");

export default function FormStep1({ setNext, setUserField,userField}: Props) {
  const {
    name,
    email,
    day,
    month,
    year,
    onHandleYaer,
    onHandleMonth,
    onHandleDay,
    onUsernameChange,
    onEmailChange,
  } = useFormFields(userField);

  const { errors, validateField } = useFormValidation();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    validateField(userNameSchema, "name", name);
  }, [name, clicked]);
  useEffect(() => {
    validateField(emailSchema, "email", email);
  }, [email, clicked]);
  useEffect(() => {
    validateField(yearSchema, "year", year);
  }, [year, clicked]);
  useEffect(() => {
    validateField(daySchema, "day", day);
  }, [day, clicked]);
  useEffect(() => {
    validateField(monthSchema, "month", month);
  }, [month, clicked]);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    const dayNum: number = Number(day)-1;
    const monthNum: number = Number(month); // Months are zero-based
    const yearNum: number = Number(year);
    const dateObj= new Date(yearNum,dayNum,monthNum);
    const date = formatDate(dateObj);
    const allErrors = { ...errors };
    const hasErrors = Object.values(allErrors).some((error) => error !== "");
    if (!hasErrors) {
      setNext((pre) => pre + 1);
      setUserField((pre) => ({ ...pre, name, email, date }));
      toast.warning("Please check all details!");
    }
  };

  return (
    <div className={` flex flex-col w-full mt-14`}>
      <form onSubmit={handleNext} className="flex flex-col gap-4 w-[360px] sm:w-[400px] mx-auto px-5">
        <div>
          <h1 className="text-2xl font-black mx-auto ">Create your account</h1>
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder=""
            className="input peer"
          value={name}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
          <label htmlFor="password" className=" label ">
            {" "}
            Name
          </label>
          {errors && clicked && (
            <span className="text-red-700 pt-1"> {errors.name}</span>
          )}
        </div>
        <div className="relative  z-0 w-full group">
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder=""
            className="input peer"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <label htmlFor="email" className=" label ">
            {" "}
            Email
          </label>
          {errors && clicked && (
            <span className="text-red-700 pt-1"> {errors.email}</span>
          )}
        </div>
        <div className="mt-4">
          <p>Date of birth</p>
          <p className="text-[13.5px] text-slate-500">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
        </div>
        <div className="flex gap-2 w-full -translate-y-2">
          <div className="relative flex-1 z-0 ">
            <select
              className=" bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-6 pb-2 pt-6  rounded-md appearance-none peer "
              value={month}
              name="month"
              onChange={(e) => onHandleMonth(e.target.value)}
            >
              <option className="bg-gray-300 dark:bg-black"></option>
              <option className="bg-gray-300 dark:bg-black" value="01">
                January
              </option>
              <option className="bg-gray-300 dark:bg-black" value="02">
                Fabuary
              </option>
              <option className="bg-gray-300 dark:bg-black" value="03">
                March
              </option>
              <option className="bg-gray-300 dark:bg-black" value="04">
                April
              </option>
              <option className="bg-gray-300 dark:bg-black" value="05">
                May
              </option>
              <option className="bg-gray-300 dark:bg-black" value="06">
                June
              </option>
              <option className="bg-gray-300 dark:bg-black" value="07">
                July
              </option>
              <option className="bg-gray-300 dark:bg-black" value="08">
                Agust
              </option>
              <option className="bg-gray-300 dark:bg-black" value="09">
                September
              </option>
              <option className="bg-gray-300 dark:bg-black" value="10">
                October
              </option>
              <option className="bg-gray-300 dark:bg-black" value="11">
                November
              </option>
              <option className="bg-gray-300 dark:bg-black" value="12">
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
            {errors && clicked && (
              <span className="text-red-700 ml-1  text-sm">{errors.month}</span>
            )}
          </div>
          <div className="relative z-0">
            <select
              className="block bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-14 pb-2 pt-6  rounded-md appearance-none peer "
              value={day}
              name="day"
              onChange={(e) => onHandleDay(e.target.value)}
            >
              <option></option>
              {Array(30)
                .fill(null)
                .map((_u, i) => (
                  <option
                    key={i + 1}
                    className="bg-gray-300 dark:bg-black"
                    value={i + 1}
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
            {errors && clicked && (
              <span className="text-red-700 ml-1  text-sm">{errors.day}</span>
            )}
          </div>
          <div className="relative z-0">
            <select
              className="block bg-transparent border border-slate-600 focus:border-2 focus:border-sky-500 outline-none focus:ring-0 pl-2 pr-12 pb-2 pt-6  rounded-md appearance-none peer "
              value={year}
              name="year"
              onChange={(e) => onHandleYaer(e.target.value)}
            >
              <option></option>
              {Array(50)
                .fill(null)
                .map((_u, i) => (
                  <option
                    key={2023 - i}
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
            {errors && clicked && (
              <span className="text-red-700 ml-1  text-sm">{errors.year}</span>
            )}
          </div>
        </div>
        <div className="relative mt-5 ">
          <button
            className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50 "
            
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
