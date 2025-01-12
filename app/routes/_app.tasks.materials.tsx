import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteTaskMaterial } from "~/data/tasks.server";

const MaterialsTasks: React.FC = () => {
  return redirect("/tasks");
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const method = await formData.get("_method");
  const taskMaterialData = {
    task_id: formData.get("task_id") as string,
    material_id: formData.get("material_id") as string,
    quantity: "0",
  };

  if (method === "delete") {
    console.log("Delete Task Material");
    deleteTaskMaterial(taskMaterialData, request);
    return redirect(`/tasks/${taskMaterialData.task_id}`);
  }
}

export default MaterialsTasks;
