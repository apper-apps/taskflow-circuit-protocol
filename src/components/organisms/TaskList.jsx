import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const TaskList = ({ 
  tasks, 
  categories, 
  loading, 
  error, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onReorderTasks,
  onRetry,
  className 
}) => {
  // React hooks must be called before any early returns
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(task => task.Id === active.id);
      const newIndex = tasks.findIndex(task => task.Id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      const taskIds = newTasks.map(task => task.Id);
      
      onReorderTasks?.(taskIds);
    }
  };

  const getCategoryForTask = (task) => {
    return categories?.find(cat => cat.Id === task.categoryId);
  };

  // Early returns after hooks
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return <Empty 
      title="No tasks found"
      description="Get started by creating your first task or adjust your filters to see more results."
    />;
  }

return (
    <div className={`space-y-4 ${className}`}>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={tasks.map(task => task.Id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                style={{ marginBottom: '1rem' }}
              >
                <TaskCard
                  task={task}
                  category={getCategoryForTask(task)}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskList;