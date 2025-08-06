import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskFilters = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusChange,
  categoryFilter, 
  onCategoryChange,
  priorityFilter, 
  onPriorityChange,
  categories,
  onAddTask,
  className 
}) => {
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];
const categoryOptions = categories?.map(cat => ({
    value: cat.Id.toString(),
    label: cat.Name
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-b border-gray-200 p-6 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          Tasks
        </h2>
        <Button
          variant="primary"
          onClick={onAddTask}
          className="shadow-lg"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar 
            placeholder="Search tasks..."
            onSearch={onSearchChange}
            value={searchQuery}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            options={statusOptions}
            onChange={onStatusChange}
            placeholder="All Status"
          />
          
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={categoryOptions}
            onChange={onCategoryChange}
            placeholder="All Categories"
          />
          
          <FilterDropdown
            label="Priority"
            value={priorityFilter}
            options={priorityOptions}
            onChange={onPriorityChange}
            placeholder="All Priorities"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskFilters;