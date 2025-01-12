import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import TaskForm from "~/components/tasks/TaskForm";
import Modal from "~/components/Utils/Modal";
import { addTask } from "~/data/tasks.server";
import { validateTask } from "~/data/validations.server";

export default function TaskAdd() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }
  return (
    <>
      <Modal onClose={closeHandler}>
        <TaskForm />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("POST Task");
  const formData = await request.formData();
  const formattedStartDate = new Date(
    formData.get("start_date")?.toString() || ""
  ).toLocaleDateString("sv");
  const formattedEndDate = new Date(
    formData.get("end_date")?.toString() || ""
  ).toLocaleDateString("sv");
  const taskData = {
    name: formData.get("name") as string,
    description: formData.get("description")
      ? (formData.get("description") as string)
      : "",
    start_date: formattedStartDate as string,
    end_date: formattedEndDate as string,
    total_time: formData.get("total_time") as string,
    status: formData.get("status") as string,
  };

//   console.log(taskData);

  try {
    validateTask(taskData);
    
  } catch (error) {
    return error;
  }

  await addTask(taskData, request);
  return redirect("/tasks");
}
