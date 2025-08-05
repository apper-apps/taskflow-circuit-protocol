import { motion } from "framer-motion";
import { format, isToday, isPast } from "date-fns";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityIndicator from "@/components/molecules/PriorityIndicator";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  const handleToggleComplete = () => {
    onToggleComplete && onToggleComplete(task.Id);
  };

  const handleEdit = () => {
    onEdit && onEdit(task);
  };

  const handleDelete = () => {
    onDelete && onDelete(task.Id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={cn(
        "bg-white border border-gray-200 rounded-12 p-4 transition-all duration-200 hover:border-gray-300 group",
        task.completed && "opacity-75 bg-gradient-to-r from-gray-50 to-white",
        isOverdue && !task.completed && "border-red-200 bg-gradient-to-r from-red-50 to-white",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "text-sm font-semibold text-gray-900 font-display",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mt-1 font-body",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-3 mt-3">
                <PriorityIndicator priority={task.priority} />
                
                {category && (
                  <CategoryBadge category={category} />
                )}
                
                {task.dueDate && (
                  <div className={cn(
                    "flex items-center space-x-1 text-xs font-body",
                    isOverdue && !task.completed && "text-red-600",
                    isDueToday && !task.completed && "text-yellow-600",
                    task.completed && "text-gray-400"
                  )}>
                    <ApperIcon name="Calendar" size={12} />
                    <span>
                      {isToday(new Date(task.dueDate)) 
                        ? "Today" 
                        : format(new Date(task.dueDate), "MMM d")
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1.5 text-gray-400 hover:text-red-600"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;