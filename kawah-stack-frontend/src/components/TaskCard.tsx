export default function TaskCard({title, description, createdAt, status}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">
        {description || "No description provided."}
      </p>
      <div className="mt-2 text-xs text-gray-500">
        Created at: {new Date(createdAt).toLocaleDateString()}
      </div>
      <div className="mt-1 text-xs">
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${
            status === "pending"
              ? "bg-yellow-500"
              : status === "in-progress"
                ? "bg-blue-500"
                : "bg-green-500"
          }`}
        >
          {status.replace("-", " ")}
        </span>
      </div>
    </div>
  );
}
