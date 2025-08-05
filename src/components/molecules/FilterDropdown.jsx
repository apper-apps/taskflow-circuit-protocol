import { cn } from "@/utils/cn";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FilterDropdown = ({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder = "All",
  className 
}) => {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {label && (
        <label className="text-xs font-medium text-gray-600 font-body">
          {label}
        </label>
      )}
      <div className="relative">
        <Select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="appearance-none pr-8 bg-gradient-to-r from-gray-50 to-white border-gray-200"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="ChevronDown" 
            size={16} 
            className="text-gray-400" 
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;