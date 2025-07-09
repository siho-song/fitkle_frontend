import { useState, useCallback } from "react";
import { validateEmail, validatePassword, validatePasswordConfirm } from "@/utils/validation";

interface UseEmailValidationReturn {
  email: string;
  emailError: string | null;
  setEmail: (email: string) => void;
  isEmailValid: boolean;
}

export const useEmailValidation = (initialEmail: string = ""): UseEmailValidationReturn => {
  const [email, setEmailState] = useState(initialEmail);
  const [emailError, setEmailError] = useState<string | null>(null);

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    const error = validateEmail(value);
    setEmailError(error);
  }, []);

  return {
    email,
    emailError,
    setEmail,
    isEmailValid: !emailError && email.length > 0
  };
};

interface UsePasswordValidationReturn {
  password: string;
  passwordError: string | null;
  setPassword: (password: string) => void;
  isPasswordValid: boolean;
}

export const usePasswordValidation = (initialPassword: string = ""): UsePasswordValidationReturn => {
  const [password, setPasswordState] = useState(initialPassword);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const setPassword = useCallback((value: string) => {
    setPasswordState(value);
    const validation = validatePassword(value);
    setPasswordError(validation.isValid ? null : validation.errors.join(", "));
  }, []);

  return {
    password,
    passwordError,
    setPassword,
    isPasswordValid: validatePassword(password).isValid
  };
};

interface UsePasswordConfirmValidationReturn {
  passwordConfirm: string;
  passwordConfirmError: string | null;
  setPasswordConfirm: (password: string) => void;
  isPasswordConfirmValid: boolean;
}

export const usePasswordConfirmValidation = (
  originalPassword: string,
  initialPasswordConfirm: string = ""
): UsePasswordConfirmValidationReturn => {
  const [passwordConfirm, setPasswordConfirmState] = useState(initialPasswordConfirm);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);

  const setPasswordConfirm = useCallback((value: string) => {
    setPasswordConfirmState(value);
    const error = validatePasswordConfirm(originalPassword, value);
    setPasswordConfirmError(error);
  }, [originalPassword]);

  return {
    passwordConfirm,
    passwordConfirmError,
    setPasswordConfirm,
    isPasswordConfirmValid: !passwordConfirmError && passwordConfirm.length > 0
  };
};