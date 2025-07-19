"use client";

import TaskCard from "../../components/TaskCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTasks, Task } from "../../hooks/useTasks";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";

// Define props for Header component
interface HeaderProps {
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => (
  <section className="header">
    <nav className="flex justify-between items-center">
      <Link
        href="/tasks"
        className="text-3xl font-bold mb-6 text-center items-center"
      >
        Kawah Task
      </Link>
      <ul className="flex gap-4 text-blue-950">
        <Link href="/profile" className="text-blue-600">
          {userName ?? "Profile"}
        </Link>
        <button
          onClick={onLogout}
          className="text-red-600 bg-transparent border-none cursor-pointer p-0"
        >
          Logout
        </button>
      </ul>
    </nav>
  </section>
);

// Define props for AddTaskForm
interface AddTaskFormProps {
  newTask: Omit<Task, "_id" | "createdAt" | "updatedAt" | "user">;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setNewTask: React.Dispatch<
    React.SetStateAction<Omit<Task, "_id" | "createdAt" | "updatedAt" | "user">>
  >;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  newTask,
  handleFormChange,
  handleFormSubmit,
  setNewTask,
}) => {
  return (
    <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleFormSubmit}>
      <h2 className="font-semibold mb-4">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        className="w-full border rounded px-3 py-2 mb-3"
        required
        name="title"
        value={newTask.title}
        onChange={handleFormChange}
      />
      <textarea
        placeholder="Task description"
        className="w-full border rounded px-3 py-2 mb-3"
        name="description"
        value={newTask.description ?? ""}
        onChange={handleFormChange}
        rows={3}
      />
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        id="status"
        name="status"
        className="w-full border rounded px-3 py-2 mb-3"
        onChange={handleFormChange}
        value={newTask.status}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="reset"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={() =>
            setNewTask({ title: "", description: "", status: "pending" })
          }
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

// Define props for FilterTasks
interface FilterTasksProps {
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filter: { title?: string; status?: string };
}

const FilterTasks: React.FC<FilterTasksProps> = ({ handleFilterChange, filter }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <select
        className="border rounded px-3 py-2"
        onChange={handleFilterChange}
        value={filter.status ?? ""}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default function TasksPage() {
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  
  const { user, logout, loading: authLoading } = useAuth();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<
    Omit<Task, "_id" | "createdAt" | "updatedAt" | "user">
  >({
    title: "",
    description: "",
    status: "pending",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ title?: string; status?: string }>({});
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      setIsAuthLoaded(true);
      if (!user && typeof window !== "undefined" && !localStorage.getItem("token")) {
        window.location.href = "/login";
        return;
      }
      fetchTasks(filter);
    }
  }, [authLoading, user, fetchTasks, filter]);

  const handleEdit = (task: Task) => setEditingTask({ ...task });

  const handleSave = async () => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id, {
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
      setEditingTask(null);
      setErrorMessage(null);
      await fetchTasks(filter);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setErrorMessage(error.response?.data?.message || "Gagal memperbarui tugas.");
      console.error("Update task error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setEditingTask(null);
      setErrorMessage(null);
      await fetchTasks(filter);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setErrorMessage(error.response?.data?.message || "Gagal menghapus tugas.");
      console.error("Delete task error:", error);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setFilter({ status: status || undefined });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTask({
        title: newTask.title,
        description: newTask.description || undefined, // Handle optional description
        status: newTask.status,
      });
      setNewTask({ title: "", description: "", status: "pending" });

      setErrorMessage(null);
      await fetchTasks(filter);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setErrorMessage(error.response?.data?.message || "Gagal menambahkan tugas.");
      console.error("Add task error:", error);
    }
  };

  if (authLoading || tasksLoading || !isAuthLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Header userName={user?.name} onLogout={logout} />
      <FilterTasks handleFilterChange={handleFilterChange} filter={filter} />
      {(tasksError || errorMessage) && (
        <p className="text-red-500 mb-4">{tasksError || errorMessage}</p>
      )}
      <AddTaskForm
        newTask={newTask}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        setNewTask={setNewTask}
      />
      <ul className="space-y-4">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} onClick={() => handleEdit(task)}>
              {editingTask && editingTask._id === task._id ? (
                <div className="bg-white p-4 rounded shadow">
                  <input
                    type="text"
                    value={editingTask.title ?? ""}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        title: e.target.value,
                      })
                    }
                    className="w-full text-lg font-semibold bg-transparent focus:outline-none focus:ring-0 mb-1"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editingTask.description ?? ""}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value || undefined,
                      })
                    }
                    className="w-full text-sm text-gray-600 bg-transparent focus:outline-none focus:ring-0 mb-2 resize-none"
                    rows={2}
                    placeholder="Task description"
                  />
                  <div className="text-xs text-gray-500 mt-1 mb-2">
                    Created at: {new Date(editingTask.createdAt).toLocaleDateString()}
                  </div>
                  <div className="mb-4">
                    <div className="inline-block">
                      <select
                        id="status"
                        value={editingTask.status}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            status: e.target.value as "pending" | "in-progress" | "completed",
                          })
                        }
                        className={`
                          text-xs text-white rounded-full px-3 py-1 pr-6
                          appearance-none focus:outline-none focus:ring-0 
                          ${editingTask.status === "pending"
                            ? "bg-yellow-500"
                            : editingTask.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }
                        `}
                        style={{ minWidth: "110px" }}
                      >
                        <option className="text-black" value="pending">
                          Pending
                        </option>
                        <option className="text-black" value="in-progress">
                          In Progress
                        </option>
                        <option className="text-black" value="completed">
                          Completed
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingTask(null)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition text-sm"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                      type="button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <TaskCard
                  key={task._id}
                  task={task} // Pass the entire task object
                />
              )}
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}