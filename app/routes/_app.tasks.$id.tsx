import { useNavigate } from "@remix-run/react";
import TaskDetail from "~/components/tasks/TaskDetail";
import Modal from "~/components/Utils/Modal";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { addTask, deleteTask, updateTask } from "~/data/tasks.server";
import { Client, Material, Task, Worker } from "~/types/interfaces";

export default function TaskDetailPage() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <TaskDetail/>
    </Modal>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const taskId = params.id as string;
  const formData = await request.formData();
  const method = await formData.get("_method");
  const taskData: Task = {
    id: taskId,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    status: formData.get("status") as string,
    total_time: formData.get("total_time") as string,
    workers: formData
      .getAll("workers")
      .map((worker) => JSON.parse(worker as string) as Worker),
    client: JSON.parse(formData.get("client") as string) as Client,
    materials: formData
      .getAll("materials")
      .map((material) => JSON.parse(material as string) as Material),
  };
  // console.log(method);
  if (method === "patch") {
    await updateTask(taskData, request);
    console.log(`Updating task ID: ${taskId}`);
    return redirect(`/tasks/${taskId}`);
  } else if (method === "delete") {
    await deleteTask(taskId, request);
    console.log(`Task with id: ${taskId} deleted`);
    return redirect("/tasks");
  } else if (method === "post") {
    await addTask(taskData, request);
    console.log("Task added");
    return redirect("/tasks");
  }
}
