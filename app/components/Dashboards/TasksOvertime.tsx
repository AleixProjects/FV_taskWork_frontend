import React from "react";
import { Badge } from "flowbite-react";
import { Task } from "~/types/interfaces";

interface TasksOverTimeProps {
  tasks: Task[];
}

const TasksOverTime: React.FC<TasksOverTimeProps> = ({ tasks }) => {
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.start_date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Tasks Over Time
      </h2>
      <ul>
        {Object.keys(tasksByDate).map((date) => (
          <li key={date} className="flex items-center justify-between mb-2">
            <span className="text-gray-900 dark:text-white">{date}</span>
            <Badge className="ml-2 bg-blue-500 text-white">
              {tasksByDate[date]}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksOverTime;
