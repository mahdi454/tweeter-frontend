import { UserType } from "@/components/registerForms/CreateUser";
import { useState } from "react";

type FormFields = {
  name: string;
  email: string;
  emailToken: string;
  password: string;
  confirmPassword: string;
  year: string;
  month: string;
  day: string;
};

type FormFieldUpdater = (value: string) => void;


const useFormFields = (defValu:UserType): FormFields & {
  onUsernameChange: FormFieldUpdater;
  onEmailChange: FormFieldUpdater;
  onEmailTokenChange: FormFieldUpdater;
  onPasswordChange: FormFieldUpdater;
  onConfirmPasswordChange: FormFieldUpdater;
  onHandleYaer: FormFieldUpdater;
  onHandleMonth: FormFieldUpdater;
  onHandleDay: FormFieldUpdater;
} => {
  const [name, setUsername] = useState(""||defValu?.name);
  const [email, setEmail] = useState("" || defValu?.email);
  const [emailToken, setEmailToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleYearChange: FormFieldUpdater = (value) => {
    setYear(value);
  };
  const handleMonthChange: FormFieldUpdater = (value) => {
    setMonth(value);
  };
  const handleDayChange: FormFieldUpdater = (value) => {
    setDay(value);
  };
  const handleUsernameChange: FormFieldUpdater = (value) => {
    setUsername(value);
  };

  const handleEmailChange: FormFieldUpdater = (value) => {
    setEmail(value);
  };
  const handleEmailTokenChange: FormFieldUpdater = (value) => {
    setEmailToken(value);
  };

  const handlePasswordChange: FormFieldUpdater = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange: FormFieldUpdater = (value) => {
    setConfirmPassword(value);
  };

  return {
    name,
    email,
    emailToken,
    password,
    confirmPassword,
    year,
    month,
    day,
    onUsernameChange: handleUsernameChange,
    onEmailChange: handleEmailChange,
    onEmailTokenChange: handleEmailTokenChange,
    onPasswordChange: handlePasswordChange,
    onConfirmPasswordChange: handleConfirmPasswordChange,
    onHandleDay: handleDayChange,
    onHandleYaer: handleYearChange,
    onHandleMonth: handleMonthChange,
  };
};

export default useFormFields;
