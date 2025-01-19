import React from "react";
import { Badge } from "flowbite-react";
import { Task } from "~/types/interfaces";

interface WorkerTaskAssignmentProps {
  tasks: Task[];
}

const WorkerTaskAssignment: React.FC<WorkerTaskAssignmentProps> = ({
  tasks,
}) => {
  const workerTaskCounts = tasks.reduce((acc, task) => {
    task.workers.forEach((worker) => {
      acc[worker.name] = (acc[worker.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Worker Task Assignment
      </h2>
      <ul>
        {Object.keys(workerTaskCounts).map((worker) => (
          <li key={worker} className="flex items-center justify-between mb-2">
            <span className="text-gray-900 dark:text-white">{worker}</span>
            <Badge className="ml-2 bg-green-500 text-white">
              {workerTaskCounts[worker]}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerTaskAssignment;
