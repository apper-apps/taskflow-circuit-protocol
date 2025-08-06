class TaskService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async create(taskData) {
    try {
      // Only include Updateable fields based on field visibility
      const params = {
        records: [
          {
            Name: taskData.title || taskData.Name,
            title: taskData.title,
            description: taskData.description,
            categoryId: taskData.categoryId ? parseInt(taskData.categoryId) : null,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            completed: taskData.completed || false,
            completedAt: taskData.completedAt,
            createdAt: taskData.createdAt || new Date().toISOString(),
            Tags: taskData.Tags || ""
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create task');
        }
        
        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating task:", error.message);
        throw error;
      }
    }
  }

  async update(id, taskData) {
    try {
      // Only include Updateable fields based on field visibility
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: taskData.title || taskData.Name,
            title: taskData.title,
            description: taskData.description,
            categoryId: taskData.categoryId ? parseInt(taskData.categoryId) : null,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            completed: taskData.completed,
            completedAt: taskData.completedAt,
            createdAt: taskData.createdAt,
            Tags: taskData.Tags || ""
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update task');
        }
        
        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating task:", error.message);
        throw error;
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete task');
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting task:", error.message);
        throw error;
      }
    }
  }

  async getByCategory(categoryId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "categoryId",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
        throw error;
      }
    }
  }

  async getByStatus(completed) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "completed",
            Operator: "ExactMatch",
            Values: [completed]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks by status:", error.message);
        throw error;
      }
    }
  }

  async getByPriority(priority) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "priority",
            Operator: "EqualTo",
            Values: [priority]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by priority:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks by priority:", error.message);
        throw error;
      }
    }
  }

  async reorderTasks(taskIds) {
    try {
      // Update task positions based on new order
      const updateRecords = taskIds.map((taskId, index) => ({
        Id: parseInt(taskId),
        position: index
      }));

      const params = {
        records: updateRecords
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error reordering tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error reordering tasks:", error.message);
        throw error;
      }
    }
  }
}

// Create and export an instance for immediate use
export const taskService = new TaskService();
// Also export the class for potential direct instantiation
export default TaskService;