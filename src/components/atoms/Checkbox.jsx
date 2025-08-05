import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        checked 
          ? "bg-gradient-to-r from-accent-500 to-accent-600 border-accent-500 text-white checkbox-pulse" 
          : "border-gray-300 bg-white hover:border-gray-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={12} 
          className="text-white font-bold" 
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;