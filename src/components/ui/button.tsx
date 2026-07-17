import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className = "", variant = "primary", type = "button", ...props }, ref) => {
    const styles =
      variant === "primary"
        ? "btn-primary"
        : variant === "secondary"
          ? "btn-secondary"
          : "btn-ghost";
    return (
      <button
        ref={ref}
        type={type}
        className={`${styles} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
