import React from "react";
import { Badge } from "flowbite-react";
import { Task } from "~/types/interfaces";

interface TaskCompletionTimeProps {
  tasks: Task[];
}

const TaskCompletionTime: React.FC<TaskCompletionTimeProps> = ({ tasks }) => {
  const completionTimes = tasks
    .filter((task) => task.end_date)
    .map(
      (task) =>
        (new Date(task.end_date) - new Date(task.start_date)) /
        (1000 * 60 * 60 * 24)
    ); // in days

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Task Completion Time
      </h2>
      <ul>
        {completionTimes.map((time, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <span className="text-gray-900 dark:text-white">
              Task {index + 1}
            </span>
            <Badge className="ml-2 bg-yellow-500 text-white">
              {time.toFixed(2)} days
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCompletionTime;
