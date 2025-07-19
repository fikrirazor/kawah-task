'use client';

import { useState, useCallback } from "react";
import apiClient from "@/services/apiClientWithAuth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios"; // Import AxiosError for typing errors

// Interface for the expected Task structure in the frontend
export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  user: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for raw backend response, accounting for possible field name variations
interface RawTaskResponse {
  id?: string; // Backend might send 'id' instead of '_id'
  _id?: string;
  name?: string; // Backend might send 'name' instead of 'title'
  title?: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  results: RawTaskResponse[];
  totalResults: number;
  limit: number;
  totalPages: number;
  page: number;
}

export function useTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Utility function to transform raw response to Task interface
  const transformTask = (rawTask: RawTaskResponse): Task => ({
    _id: rawTask._id || rawTask.id || "", // Fallback to empty string if both are undefined
    title: rawTask.title || rawTask.name || "", // Fallback to empty string if both are undefined
    description: rawTask.description,
    status: rawTask.status,
    user: rawTask.user,
    createdAt: rawTask.createdAt,
    updatedAt: rawTask.updatedAt,
  });

  const fetchTasks = useCallback(
    async (filters?: { title?: string; status?: string }, currentPage: number = 1, limitPerPage: number = 10) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<TasksResponse>("/tasks", {
          params: {
            ...filters,
            page: currentPage,
            limit: limitPerPage,
          },
        });

        // Transform raw response to Task array
        const transformedTasks = response.data.results.map(transformTask);

        setTasks(transformedTasks);
        setTotal(response.data.totalResults);
        setPage(response.data.page);
        setLimit(response.data.limit);
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError(error.response?.data?.message || "Gagal mengambil daftar tugas.");
          setTasks([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const fetchTaskById = useCallback(async (taskId: string): Promise<Task> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<RawTaskResponse>(`/tasks/${taskId}`);
      console.log("Fetch Task by ID Response:", response.data);

      // Transform raw response to Task
      const transformedTask = transformTask(response.data);
      return transformedTask;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage =
        error.response?.status === 404
          ? "Task not found."
          : error.response?.data?.message || "Gagal mengambil detail tugas.";
      setError(errorMessage);
      console.error("Fetch task by ID error:", error.response?.data || error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(
    async (newTask: Omit<Task, "_id" | "createdAt" | "updatedAt" | "user">) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<RawTaskResponse>("/tasks", newTask);
        console.log("Add Task Response:", response.data);

        // Transform raw response to Task
        const transformedAddedTask = transformTask(response.data);
        setTasks((prev) => [...prev, transformedAddedTask]);
        return transformedAddedTask;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const errorMessage = error.response?.data?.message || "Gagal menambahkan tugas.";
        setError(errorMessage);
        console.error("Add task error:", error.response?.data || error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateTask = useCallback(
    async (taskId: string, updatedTask: Partial<Task>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.patch<RawTaskResponse>(`/tasks/${taskId}`, updatedTask);
        console.log("Update Task Response:", response.data);

        // Transform raw response to Task
        const transformedUpdatedTask = transformTask(response.data);
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? transformedUpdatedTask : task))
        );
        return transformedUpdatedTask;
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const errorMessage = error.response?.data?.message || "Gagal memperbarui tugas.";
        setError(errorMessage);
        console.error("Update task error:", error.response?.data || error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.delete(`/tasks/${taskId}`);
        console.log("Delete Task Response:", taskId);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        const errorMessage =
          error.response?.status === 401
            ? "Session expired. Please log in again."
            : error.response?.status === 404
              ? "Task not found."
              : error.response?.data?.message || "Gagal menghapus tugas.";
        setError(errorMessage);
        console.error("Delete task error:", error.response?.data || error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    total,
    page,
    limit,
    fetchTasks,
    fetchTaskById,
    addTask,
    updateTask,
    deleteTask,
  };
}