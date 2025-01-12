import { ActionFunctionArgs, redirect } from "react-router-dom";
import React from "react";
import { deleteTaskWorker } from "~/data/tasks.server";

const StaffTasks: React.FC = () => {
  return redirect("/tasks");
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const method = await formData.get("_method");
  const taskWorkerData = {
    task_id: formData.get("task_id") as string,
    worker_id: formData.get("worker_id") as string,
    total_time: "0",
  };


  if (method === "delete") {
    deleteTaskWorker(taskWorkerData, request);
    return redirect(`/tasks/${taskWorkerData.task_id}`);
  }
}

export default StaffTasks;
