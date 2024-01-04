"use client";

import { Button, CircularProgress } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonProps;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
      disabled={pending}
      startIcon={pending && <CircularProgress size={20} />}
    >
      {children}
    </Button>
  );
}
