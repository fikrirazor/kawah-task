"use client";
import TaskCard from "../../components/TaskCard";
import { useState } from "react";
import Link from "next/link";
export default function TasksPage() {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };

  const handleSave = () => {
    const updateTasks = tasks.map((t) => (t._id === task._id ? task : t));

    setTasks(updateTasks);
    setEditingTask(null);
  };
  // Dummy tasks data
  const tasks = [
    {
      _id: "1",
      title: "Design UI for Task Detail",
      description: "Create wireframe and mockup for task detail page.",
      createdAt: new Date().toISOString(),
      status: "pending",
    },
    {
      _id: "2",
      title: "Setup Backend API",
      description: "Configure Express.js and MongoDB connection.",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
      status: "in-progress",
    },
    {
      _id: "3",
      title: "Write Unit Tests",
      description: "Implement Jest tests for user authentication.",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // two days ago
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <section className="header">
        <nav className="flex justify-between items-center">
          <Link
            href="/tasks"
            className="text-3xl font-bold mb-6 text-center items-center"
          >
            Kawah Task
          </Link>
          <ul className="flex gap-4 text-blue-950 ">
            <Link href="/profile" className="text-blue-600">
              Profile
            </Link>
            <Link href="/logout" className="text-red-600">
              Logout
            </Link>
          </ul>
        </nav>
      </section>
      <div className="mb-4 flex justify-between items-center">
        <select className="border rounded px-3 py-2">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
      <form className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Add New Task</h2>

        <input
          type="text"
          placeholder="Task title"
          className="w-full border rounded px-3 py-2 mb-3"
          required
          name="title"
          id="title"
          autoComplete="off"
        />

        <textarea
          placeholder="Task description"
          className="w-full border rounded px-3 py-2 mb-3"
          required
          name="description"
          id="description"
          autoComplete="off"
          rows={3}
        />

        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full border rounded px-3 py-2 mb-3"
          defaultValue="pending"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="reset"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
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
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} onClick={() => handleEdit(task)}>
            {editingTask && editingTask._id === task._id ? (
              // Form Edit Inline - Replace TaskCard
              <div className="bg-white p-4 rounded shadow">
                {/* Title */}
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="w-full text-lg font-semibold bg-transparent focus:outline-none focus:ring-0 mb-1"
                  placeholder="Task title"
                />

                {/* Description */}
                <textarea
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full text-sm text-gray-600 bg-transparent focus:outline-none focus:ring-0 mb-2 resize-none"
                  rows={2}
                  placeholder="Task description"
                />

                {/* Created at (read-only) */}
                <div className="text-xs text-gray-500 mt-1 mb-2">
                  Created at:{" "}
                  {new Date(editingTask.createdAt).toLocaleDateString()}
                </div>

                {/* Status dropdown badge-style */}
                <div className="mb-4">
                  <div className="inline-block">
                    <select
                      id="status"
                      value={editingTask.status}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          status: e.target.value,
                        })
                      }
                      className={`
                                                text-xs text-white rounded-full px-3 py-1 pr-6
                                                appearance-none focus:outline-none focus:ring-0 
                                                ${
                                                  editingTask.status ===
                                                  "pending"
                                                    ? "bg-yellow-500"
                                                    : editingTask.status ===
                                                        "in-progress"
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

                {/* Buttons */}
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
                    onClick={handleSave}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              // Tampilkan TaskCard biasa jika tidak sedang edit
              <TaskCard task={task} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
