import { ActionFunctionArgs, redirect } from "react-router-dom";
import { addTaskMaterial } from "~/data/tasks.server";


const AddMaterialTask = () => {
    return redirect("/tasks");
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const taskMaterialData = {
        task_id: formData.get("task_id") as string,
        material_id: formData.get("material_id") as string,
        quantity: "0",
    };

    console.log(taskMaterialData);

    await addTaskMaterial(taskMaterialData, request);

    return redirect(`/tasks/${taskMaterialData.task_id}`); 
}

export default AddMaterialTask;
