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
    return redirect("/tasks");
  } else if (method === "delete") {
    console.log(`Task with id: ${taskId} deleted`);
    await deleteTask(taskId, request);
    return redirect("/tasks");
  } else if (method === "POST") {
    console.log("Aqui no he d'entrar");
  }
}
