import tasksData from "@/services/mockData/tasks.json";
class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.tasks];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newId = Math.max(...this.tasks.map(t => t.Id), 0) + 1;
    const newTask = {
      Id: newId,
      ...taskData,
      createdAt: new Date().toISOString()
    };
    
    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks[index] = { ...this.tasks[index], ...taskData };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks.splice(index, 1);
    return true;
  }

  async getByCategory(categoryId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.tasks.filter(t => t.categoryId === parseInt(categoryId));
  }

  async getByStatus(completed) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.tasks.filter(t => t.completed === completed);
}

  async getByPriority(priority) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.tasks.filter(t => t.priority === priority);
  }

  async reorderTasks(taskIds) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Update task positions based on new order
    taskIds.forEach((taskId, index) => {
      const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(taskId));
      if (taskIndex !== -1) {
        this.tasks[taskIndex].position = index;
      }
    });
    
    return [...this.tasks];
  }
}

// Create and export an instance for immediate use
export const taskService = new TaskService();

// Also export the class for potential direct instantiation
export default TaskService;