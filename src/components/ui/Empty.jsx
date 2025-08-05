import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item.",
  action,
  onAction,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name="CheckSquare" 
          size={40} 
          className="text-primary-600" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 font-display mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 font-body mb-6 max-w-md">
        {description}
      </p>
      
      {action && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          className="shadow-lg"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {action}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;