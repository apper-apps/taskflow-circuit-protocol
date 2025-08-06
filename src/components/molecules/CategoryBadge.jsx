import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const CategoryBadge = ({ category, className }) => {
  if (!category) return null;
const getColorStyle = (color) => {
    const colorMap = {
      "#5B21B6": "primary",
      "#8B5CF6": "secondary", 
      "#10B981": "success",
      "#F59E0B": "warning",
      "#EF4444": "error",
      "#3B82F6": "info"
    };
    return colorMap[color] || "default";
  };

  return (
    <Badge 
      variant={getColorStyle(category.color)}
      className={cn("text-xs font-medium", className)}
    >
      {category.Name}
    </Badge>
  );
};

export default CategoryBadge;