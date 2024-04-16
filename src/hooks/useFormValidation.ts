import { useState } from "react";
import { ZodError, ZodSchema } from "zod"; // Import ZodSchema and string from Zod

type ValidationErrors = { [key: string]: string };

// Custom hook for form validation
const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (
    schema: ZodSchema<string| object>, // Use ZodSchema<string> for schema
    name: string,
    value: string
  ) => {
    try {
      schema.parse(value); // Parse the value with the provided schema
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors[0]?.message || "";
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
      } else {
        console.error("Unknown error occurred");
      }
    }
  };
  return {
    errors,
    validateField,
    setErrors
  };
};

export default useFormValidation;
