import { ActionFunctionArgs, redirect } from "react-router-dom";
import { addTaskWorker } from "~/data/tasks.server";
import { validateTaskWorker } from "~/data/validations.server";
import { TaskWorker, TaskWorkerInput } from "~/types/interfaces";

const AddStaffTask = () => {
  return redirect("/tasks");
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("Adding Worker to Task");
  const formData = await request.formData();

  const taskWorkerData: TaskWorkerInput = {
    task_id: formData.get("task_id") as string,
    worker_id: formData.get("worker_id") as string,
    total_time: "0",
  };

  console.log(taskWorkerData);

  //   try {
  //     validateTaskWorker(taskWorkerData);
  //     console.log("Validated");
  //   } catch (error) {
  //     return error;
  //   }

  await addTaskWorker(taskWorkerData, request);

  //   console.log(result);

  return redirect(`/tasks/${taskWorkerData.task_id}`);
}

export default AddStaffTask;
