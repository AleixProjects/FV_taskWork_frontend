import React from "react";
import { Badge } from "flowbite-react";
import { Task } from "~/types/interfaces";

interface TasksByClientProps {
  tasks: Task[];
}

const TasksByClient: React.FC<TasksByClientProps> = ({ tasks }) => {
  const clientTaskCounts = tasks.reduce((acc, task) => {
    acc[task.client] = (acc[task.client] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Tasks by Client
      </h2>
      <ul>
        {Object.keys(clientTaskCounts).map((client) => (
          <li key={client} className="flex items-center justify-between mb-2">
            <span className="text-gray-900 dark:text-white">{client}</span>
            <Badge className="ml-2 bg-purple-500 text-white">
              {clientTaskCounts[client]}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksByClient;
