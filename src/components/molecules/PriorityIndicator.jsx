import { cn } from "@/utils/cn";

const PriorityIndicator = ({ priority, className }) => {
  const priorityStyles = {
    low: "bg-gradient-to-r from-green-400 to-green-500",
    medium: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    high: "bg-gradient-to-r from-red-400 to-red-500"
  };

  const priorityLabels = {
    low: "Low Priority",
    medium: "Medium Priority", 
    high: "High Priority"
  };

  return (
    <div 
      className={cn(
        "w-3 h-3 rounded-full shadow-sm",
        priorityStyles[priority],
        className
      )}
      title={priorityLabels[priority]}
    />
  );
};

export default PriorityIndicator;