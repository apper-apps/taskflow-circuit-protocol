import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ 
  categories, 
  activeCategoryId, 
  onCategorySelect,
  className 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    } else {
      navigate("/");
    }
    onCategorySelect && onCategorySelect(categoryId);
  };

  const handleStatusFilter = (status) => {
    navigate(`/status/${status}`);
  };

  const handlePriorityFilter = (priority) => {
    navigate(`/priority/${priority}`);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isActiveCategoryRoute = (categoryId) => {
    return location.pathname === `/category/${categoryId}`;
  };

  const isActiveStatusRoute = (status) => {
    return location.pathname === `/status/${status}`;
  };

  const isActivePriorityRoute = (priority) => {
    return location.pathname === `/priority/${priority}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "w-64 bg-gradient-to-b from-surface to-white border-r border-gray-200 p-6 space-y-6 overflow-y-auto",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-8 flex items-center justify-center">
          <ApperIcon name="CheckSquare" size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
          TaskFlow
        </h1>
      </div>

      {/* All Tasks */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-display">
          Views
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCategoryClick(null)}
          className={cn(
            "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100",
            isActiveRoute("/") && "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700"
          )}
        >
          <ApperIcon name="Home" size={16} className="mr-3" />
          All Tasks
        </Button>
      </div>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-display">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.Id}
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(category.Id)}
                className={cn(
                  "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100",
                  isActiveCategoryRoute(category.Id) && "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700"
                )}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="truncate">{category.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {category.taskCount}
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Status Filters */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-display">
          Status
        </h2>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusFilter("active")}
            className={cn(
              "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100",
              isActiveStatusRoute("active") && "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700"
            )}
          >
            <ApperIcon name="Clock" size={16} className="mr-3" />
            Active Tasks
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusFilter("completed")}
            className={cn(
              "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100",
              isActiveStatusRoute("completed") && "bg-gradient-to-r from-green-100 to-green-200 text-green-700"
            )}
          >
            <ApperIcon name="CheckCircle" size={16} className="mr-3" />
            Completed Tasks
          </Button>
        </div>
      </div>

      {/* Priority Filters */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-display">
          Priority
        </h2>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePriorityFilter("high")}
            className={cn(
              "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100",
              isActivePriorityRoute("high") && "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
            )}
          >
            <div className="w-3 h-3 rounded-full mr-3 bg-gradient-to-r from-red-400 to-red-500" />
            High Priority
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePriorityFilter("medium")}
            className={cn(
              "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100",
              isActivePriorityRoute("medium") && "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700"
            )}
          >
            <div className="w-3 h-3 rounded-full mr-3 bg-gradient-to-r from-yellow-400 to-yellow-500" />
            Medium Priority
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePriorityFilter("low")}
            className={cn(
              "w-full justify-start text-left font-body hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100",
              isActivePriorityRoute("low") && "bg-gradient-to-r from-green-100 to-green-200 text-green-700"
            )}
          >
            <div className="w-3 h-3 rounded-full mr-3 bg-gradient-to-r from-green-400 to-green-500" />
            Low Priority
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategorySidebar;