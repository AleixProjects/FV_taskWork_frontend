import React from "react";
import TaskStatusDistribution from "./TaskStatusDistribution";
import TasksOverTime from "./TasksOvertime";
import WorkerTaskAssignment from "./WorkerTaskAssignment";
import TaskCompletionTime from "./TaskCompletionTime";
import TasksByClient from "./TasksByClient";
import { Task } from "~/types/interfaces";

interface DashboardProps {
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
//   console.log(tasks);
  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="dashboard-section p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow mb-4">
          <TaskStatusDistribution tasks={tasks.data} />
        </div>
        <div className="dashboard-section p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow mb-4">
          <TasksOverTime tasks={tasks.data} />
        </div>
        <div className="dashboard-section p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow mb-4">
          <WorkerTaskAssignment tasks={tasks.data} />
        </div>
        <div className="dashboard-section p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow mb-4">
          <TaskCompletionTime tasks={tasks.data} />
        </div>
        {/* <div className="dashboard-section p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow mb-4">
        <TasksByClient tasks={tasks.data} />
      </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
