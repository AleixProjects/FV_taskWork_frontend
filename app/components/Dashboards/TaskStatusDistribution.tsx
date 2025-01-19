import React from "react";
import { Badge } from "flowbite-react";
import { Task } from "~/types/interfaces";

interface TaskStatusDistributionProps {
  tasks: Task[];
}

const TaskStatusDistribution: React.FC<TaskStatusDistributionProps> = ({
  tasks,
}) => {
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusColors: Record<string, string> = {
    pending_revision: "bg-neutral-400 text-white",
    waiting_accept: "bg-yellow-300 text-white",
    to_start: "bg-orange-400 text-white",
    in_progress: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
    payment_pending: "bg-purple-500 text-white",
    paid: "bg-teal-500 text-white",
  };

  return (
    <div className="dashboard-section bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Task Status Distribution
      </h2>
      <ul>
        {Object.keys(statusCounts).map((status) => (
          <li key={status} className="flex items-center justify-between mb-2">
            <span className="capitalize text-gray-900 dark:text-white">{status.replace("_", " ")}</span>
            <Badge
              className={`ml-2 ${
                statusColors[status] || "bg-gray-200 text-gray-800"
              }`}
            >
              {statusCounts[status]}
            </Badge>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default TaskStatusDistribution;
