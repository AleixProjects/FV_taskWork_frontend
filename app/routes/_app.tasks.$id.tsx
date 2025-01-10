import { useNavigate } from "@remix-run/react";
import TaskDetail from "~/components/tasks/TaskDetail";
import Modal from "~/components/Utils/Modal";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { deleteTask } from "~/data/tasks.server";

export default function TaskDetailPage() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <TaskDetail />
    </Modal>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const taskId = params.id as string;
  const formData = await request.formData();
  const method = await formData.get("_method");
  // console.log(method);
  if (method === "PATCH") {
    console.log(`Updating task ID: ${taskId}`);
    return redirect(`/tasks/${taskId}`);
  } else if (method === "delete") {
    await deleteTask(taskId, request);
    console.log(`Task with id: ${taskId} deleted`);
    return redirect("/tasks");
  }
}
