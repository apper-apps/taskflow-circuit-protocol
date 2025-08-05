import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-secondary-400 to-secondary-500 text-white hover:from-secondary-500 hover:to-secondary-600 focus:ring-secondary-400 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    success: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300 hover:text-gray-900",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 hover:border-gray-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-8",
    md: "px-4 py-2 text-sm rounded-8",
    lg: "px-6 py-3 text-base rounded-8",
    xl: "px-8 py-4 text-lg rounded-12"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;