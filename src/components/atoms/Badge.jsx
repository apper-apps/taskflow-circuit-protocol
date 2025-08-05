import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border border-primary-200",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border border-secondary-200",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-200",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-200",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-200",
    info: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;