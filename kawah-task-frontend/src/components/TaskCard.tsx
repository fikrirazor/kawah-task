import type { Task } from "@/hooks/useTasks";

// Define props interface with a single task prop
interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">
        {task.description ?? "No description provided."}
      </p>
      <div className="mt-2 text-xs text-gray-500">
        Created at: {new Date(task.createdAt).toLocaleDateString()}
      </div>
      <div className="mt-1 text-xs">
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${
            task.status === "pending"
              ? "bg-yellow-500"
              : task.status === "in-progress"
                ? "bg-blue-500"
                : "bg-green-500"
          }`}
        >
          {task.status.replace("-", " ")}
        </span>
      </div>
    </div>
  );
}