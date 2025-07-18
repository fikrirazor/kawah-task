// src/hooks/useTasks.ts
'use client';

import { useState, useCallback } from "react";
import apiClient from "@/services/apiClientWithAuth";
import { useRouter } from "next/navigation";

export interface Task {
  _id: string; // Menggunakan _id
  title: string; // Menggunakan title
  description?: string;
  status: "pending" | "in-progress" | "completed";
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  results: Task[];
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

        // Pastikan response.data.results memiliki _id dan title
        // Jika backend Anda mengirim 'id' dan 'name', Anda perlu memetakan di sini
        const transformedTasks = response.data.results.map(task => ({
          ...task,
          _id: task._id || (task as any).id, // Fallback jika backend mengirim 'id'
          title: task.title || (task as any).name // Fallback jika backend mengirim 'name'
        }));

        setTasks(transformedTasks);
        setTotal(response.data.totalResults);
        setPage(response.data.page);
        setLimit(response.data.limit);

      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError(err.response?.data?.message || "Gagal mengambil daftar tugas.");
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
      const response = await apiClient.get<Task>(`/tasks/${taskId}`);
      console.log("Fetch Task by ID Response:", response.data); // Debug
      
      // Transformasi jika backend mengirim 'id' dan 'name'
      const transformedTask: Task = {
        ...response.data,
        _id: response.data._id || (response.data as any).id,
        title: response.data.title || (response.data as any).name
      };
      return transformedTask;
    } catch (err: any) {
      const errorMessage =
        err.response?.status === 404
          ? "Task not found."
          : err.response?.data?.message || "Gagal mengambil detail tugas.";
      setError(errorMessage);
      console.error("Fetch task by ID error:", err.response?.data || err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(
    async (newTask: Omit<Task, "_id" | "createdAt" | "updatedAt" | "user">) => { // Hapus __v dari Omit
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<Task>("/tasks", newTask);
        console.log("Add Task Response:", response.data); // Debug
        
        // Transformasi jika backend mengirim 'id' dan 'name'
        const transformedAddedTask: Task = {
          ...response.data,
          _id: response.data._id || (response.data as any).id,
          title: response.data.title || (response.data as any).name
        };
        setTasks((prev) => [...prev, transformedAddedTask]);
        return transformedAddedTask;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Gagal menambahkan tugas.";
        setError(errorMessage);
        console.error("Add task error:", err.response?.data || err);
        throw err;
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
        const response = await apiClient.patch<Task>(`/tasks/${taskId}`, updatedTask); // Menggunakan PATCH
        console.log("Update Task Response:", response.data); // Debug
        
        // Transformasi jika backend mengirim 'id' dan 'name'
        const transformedUpdatedTask: Task = {
          ...response.data,
          _id: response.data._id || (response.data as any).id,
          title: response.data.title || (response.data as any).name
        };

        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? transformedUpdatedTask : task))
        );
        return transformedUpdatedTask;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Gagal memperbarui tugas.";
        setError(errorMessage);
        console.error("Update task error:", err.response?.data || err);
        throw err;
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
        console.log("Delete Task Response:", taskId); // Debug
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (err: any) {
        const errorMessage =
          err.response?.status === 401
            ? "Session expired. Please log in again."
            : err.response?.status === 404
              ? "Task not found."
              : err.response?.data?.message || "Gagal menghapus tugas.";
        setError(errorMessage);
        console.error("Delete task error:", err.response?.data || err);
        throw err;
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