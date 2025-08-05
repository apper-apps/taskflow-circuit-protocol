import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import ApperIcon from "@/components/ApperIcon";
import TaskList from "@/components/organisms/TaskList";
import ProgressDashboard from "@/components/organisms/ProgressDashboard";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskCard from "@/components/organisms/TaskCard";
import AddTaskModal from "@/components/organisms/AddTaskModal";
import Button from "@/components/atoms/Button";

const TaskManager = () => {
  const { categoryId, priority, status } = useParams();
  const { categories } = useOutletContext();
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(status || "");
  const [categoryFilter, setCategoryFilter] = useState(categoryId || "");
  const [priorityFilter, setPriorityFilter] = useState(priority || "");
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showMobileAdd, setShowMobileAdd] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // Update filters based on URL params
    setStatusFilter(status || "");
    setCategoryFilter(categoryId || "");
    setPriorityFilter(priority || "");
  }, [categoryId, priority, status]);

  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, statusFilter, categoryFilter, priorityFilter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(task =>
        statusFilter === "completed" ? task.completed : !task.completed
      );
    }

    // Category filter
    if (categoryFilter) {
      const catId = parseInt(categoryFilter);
      filtered = filtered.filter(task => task.categoryId === catId);
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };

      await taskService.update(taskId, updatedTask);
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task marked as active",
        { position: "top-right" }
      );
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        completed: false,
        completedAt: null,
        createdAt: new Date().toISOString()
      };

      const createdTask = await taskService.create(newTask);
      setTasks(prev => [createdTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsAddModalOpen(true);
  };

  const handleUpdateTask = async (taskData) => {
    try {
      if (!editingTask) return;

      const updatedTask = {
        ...editingTask,
        ...taskData
      };

      await taskService.update(editingTask.Id, updatedTask);
      setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
} catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
};

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleReorderTasks = async (taskIds) => {
    try {
      // Update local state immediately for smooth UX
      const reorderedTasks = taskIds.map(id => 
        tasks.find(task => task.Id === parseInt(id))
      ).filter(Boolean);
      
      setTasks(reorderedTasks);
      
      // Persist changes to service
      await taskService.reorderTasks(taskIds);
      toast.success("Tasks reordered successfully");
    } catch (err) {
      toast.error("Failed to reorder tasks");
      console.error("Error reordering tasks:", err);
      // Reload tasks to revert changes
      loadTasks();
    }
  };

const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingTask(null);
  };

  const handleModalSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Progress Dashboard */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <ProgressDashboard tasks={tasks} />
      </div>

      {/* Task Filters */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        categories={categories}
        onAddTask={() => setIsAddModalOpen(true)}
      />

{/* Task List */}
      <div className="p-6">
        <TaskList
          tasks={filteredTasks}
          categories={categories}
          loading={loading}
          error={error}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onReorderTasks={handleReorderTasks}
          onRetry={loadTasks}
        />
      </div>

      {/* Floating Add Button - Mobile */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 lg:hidden z-30"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsAddModalOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" size={24} />
        </Button>
      </motion.div>

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        categories={categories}
        task={editingTask}
      />
    </div>
  );
};

export default TaskManager;