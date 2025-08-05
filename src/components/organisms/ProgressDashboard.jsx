import { motion } from "framer-motion";
import { isToday, startOfToday, endOfToday } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const ProgressDashboard = ({ tasks, className }) => {
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.completed).length || 0;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Today's stats
  const todayStart = startOfToday();
  const todayEnd = endOfToday();
  const todayTasks = tasks?.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= todayStart && taskDate <= todayEnd;
  }) || [];
  
  const todayCompleted = todayTasks.filter(task => task.completed).length;
  const todayTotal = todayTasks.length;
  const todayCompletionRate = todayTotal > 0 ? (todayCompleted / todayTotal) * 100 : 0;

  const overdueTasks = tasks?.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length || 0;

  const StatCard = ({ title, value, subtitle, icon, color = "primary", progress }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-12 border border-gray-200 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 font-body">{title}</p>
          <p className="text-2xl font-bold text-gray-900 font-display mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 font-body mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-8 bg-gradient-to-r ${
          color === "primary" ? "from-primary-100 to-primary-200" :
          color === "success" ? "from-green-100 to-green-200" :
          color === "warning" ? "from-yellow-100 to-yellow-200" :
          color === "error" ? "from-red-100 to-red-200" :
          "from-blue-100 to-blue-200"
        }`}>
          <ApperIcon 
            name={icon} 
            size={20} 
            className={
              color === "primary" ? "text-primary-600" :
              color === "success" ? "text-green-600" :
              color === "warning" ? "text-yellow-600" :
              color === "error" ? "text-red-600" :
              "text-blue-600"
            }
          />
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-2 rounded-full bg-gradient-to-r ${
                color === "primary" ? "from-primary-500 to-primary-600" :
                color === "success" ? "from-green-500 to-green-600" :
                color === "warning" ? "from-yellow-500 to-yellow-600" :
                color === "error" ? "from-red-500 to-red-600" :
                "from-blue-500 to-blue-600"
              }`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          subtitle={`${completedTasks} completed`}
          icon="CheckSquare"
          color="primary"
          progress={completionRate}
        />
        
        <StatCard
          title="Today's Tasks"
          value={todayTotal}
          subtitle={`${todayCompleted} completed`}
          icon="Calendar"
          color="info"
          progress={todayCompletionRate}
        />
        
        <StatCard
          title="Completed"
          value={completedTasks}
          subtitle={`${Math.round(completionRate)}% completion rate`}
          icon="CheckCircle"
          color="success"
        />
        
        <StatCard
          title="Overdue"
          value={overdueTasks}
          subtitle={overdueTasks > 0 ? "Need attention" : "All caught up!"}
          icon="AlertCircle"
          color={overdueTasks > 0 ? "error" : "success"}
        />
      </div>
    </div>
  );
};

export default ProgressDashboard;