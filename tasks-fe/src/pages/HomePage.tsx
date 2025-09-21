import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TaskListGrid from '../components/task-list/TaskListGrid';
import TaskListForm from '../components/task-list/TaskListForm';
import ErrorAlert from '../components/common/ErrorAlert';
import { TaskListDto, ErrorResponse } from '../types';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList } from '../services/api';

/**
 * HomePage Component
 * 
 * This is the main page of the application, responsible for displaying, creating,
 * editing, and deleting task lists.
 */
const HomePage: React.FC = () => {
  // Hook for programmatic navigation.
  const navigate = useNavigate();
  
  // State to store the array of task lists.
  const [taskLists, setTaskLists] = useState<TaskListDto[]>([]);
  // State to manage the loading status while fetching data.
  const [isLoading, setIsLoading] = useState(true);
  // State to manage the submission status of the form.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to hold any error responses from the API.
  const [error, setError] = useState<ErrorResponse | null>(null);
  // State to control the visibility of the task list creation/edit form.
  const [showForm, setShowForm] = useState(false);
  // State to hold the task list currently being edited.
  const [editingTaskList, setEditingTaskList] = useState<TaskListDto | undefined>(undefined);
  
  // useEffect hook to load task lists when the component mounts.
  useEffect(() => {
    loadTaskLists();
  }, []);
  
  /**
   * Fetches all task lists from the API and updates the component's state.
   */
  const loadTaskLists = async () => {
    setIsLoading(true);
    try {
      const data = await getTaskLists();
      setTaskLists(data);
      setError(null); // Clear any previous errors.
    } catch (err) {
      console.error('Error loading task lists:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Navigates to the detailed view for a specific task list.
   * @param id - The ID of the task list to view.
   */
  const handleViewTaskList = (id: string) => {
    navigate(`/task-lists/${id}`);
  };
  
  /**
   * Shows the form to create a new task list.
   */
  const handleAddTaskList = () => {
    setEditingTaskList(undefined); // Ensure we are not in edit mode.
    setShowForm(true);
  };
  
  /**
   * Shows the form to edit an existing task list.
   * @param taskList - The task list object to be edited.
   */
  const handleEditTaskList = (taskList: TaskListDto) => {
    setEditingTaskList(taskList);
    setShowForm(true);
  };
  
  /**
   * Deletes a task list after user confirmation.
   * @param id - The ID of the task list to delete.
   */
  const handleDeleteTaskList = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task list?')) return;
    
    try {
      await deleteTaskList(id);
      // Update state by removing the deleted task list.
      setTaskLists(prev => prev.filter(tl => tl.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting task list:', err);
      setError(err as ErrorResponse);
    }
  };
  
  /**
   * Handles the submission of the TaskListForm for both creating and updating.
   * @param taskList - The task list data from the form.
   */
  const handleSubmitTaskList = async (taskList: TaskListDto) => {
    setIsSubmitting(true);
    
    try {
      if (editingTaskList?.id) {
        // If we are editing, call the update API function.
        const updated = await updateTaskList(editingTaskList.id, taskList);
        setTaskLists(prev => prev.map(tl => tl.id === editingTaskList.id ? updated : tl));
      } else {
        // Otherwise, call the create API function.
        const created = await createTaskList(taskList);
        setTaskLists(prev => [...prev, created]);
      }
      
      // Reset form state on successful submission.
      setShowForm(false);
      setEditingTaskList(undefined);
      setError(null);
    } catch (err) {
      console.error('Error saving task list:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Hides the form and resets the editing state.
   */
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTaskList(undefined);
  };
  
  // Conditionally render the form or the grid based on the `showForm` state.
  return (
    <Layout>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      
      {showForm ? (
        <div className="mt-6">
          <TaskListForm 
            taskList={editingTaskList} // Pass the task list to edit, or undefined for a new one.
            onSubmit={handleSubmitTaskList}
            onCancel={handleCancelForm}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <TaskListGrid
          taskLists={taskLists}
          onView={handleViewTaskList}
          onEdit={handleEditTaskList}
          onDelete={handleDeleteTaskList}
          onAdd={handleAddTaskList}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default HomePage;