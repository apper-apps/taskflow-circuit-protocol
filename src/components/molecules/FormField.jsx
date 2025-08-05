import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  error, 
  required, 
  className, 
  children 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-body">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error font-body">{error}</p>
      )}
    </div>
  );
};

export default FormField;