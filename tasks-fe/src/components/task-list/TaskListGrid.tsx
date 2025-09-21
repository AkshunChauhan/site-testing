import React from 'react';
import { PlusCircle } from 'lucide-react';
import { TaskListDto } from '../../types';
import TaskListCard from './TaskListCard';

// Defines the properties that the TaskListGrid component accepts.
interface TaskListGridProps {
  taskLists: TaskListDto[]; // An array of task list objects to display.
  onView: (id: string) => void; // Function to handle viewing a task list.
  onEdit: (taskList: TaskListDto) => void; // Function to handle editing a task list.
  onDelete: (id: string) => void; // Function to handle deleting a task list.
  onAdd: () => void; // Function to handle adding a new task list.
  isLoading?: boolean; // Optional flag to indicate if data is loading.
}

/**
 * TaskListGrid Component
 * 
 * This component is responsible for displaying a grid of task lists.
 * It handles the loading state, an empty state when no lists are available,
 * and renders a `TaskListCard` for each task list.
 */
const TaskListGrid: React.FC<TaskListGridProps> = ({ 
  taskLists, 
  onView, 
  onEdit, 
  onDelete, 
  onAdd,
  isLoading = false
}) => {
  // If data is loading, display a spinner.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Header: Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Lists</h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          New List
        </button>
      </div>
      
      {/* Conditional Rendering: Empty State or Grid of Task Lists */}
      {taskLists.length === 0 ? (
        // Empty State: Displayed when there are no task lists.
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="mx-auto h-16 w-16 text-gray-400 mb-4"><ClipboardEmpty /></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No task lists</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            Get started by creating your first task list to organize your tasks.
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Create Task List
          </button>
        </div>
      ) : (
        // Grid of Task Lists: Map over the taskLists array and render a card for each.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskLists.map(taskList => (
            <TaskListCard
              key={taskList.id}
              taskList={taskList}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * ClipboardEmpty Component
 * 
 * A simple SVG icon component to represent an empty clipboard.
 */
const ClipboardEmpty = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export default TaskListGrid;