import { useNavigate } from "@remix-run/react";
import Modal from "~/components/Utils/Modal";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { addWorker, deleteWorker, updateWorker } from "~/data/workers.server";
import StaffDetail from "~/components/workers/StaffDetail";

export default function TaskDetailPage() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <StaffDetail />
    </Modal>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  console.log("Action Worker");
  const workerId = params.id as string;
  const formdata = await request.formData();
  const method = await formdata.get("_method");
  console.log(method);

  if (method === "patch") {
    const image = formdata.get("profileImage") as File;
    const imageName = image.name ? image.name : null;

    const workerData = {
      id: workerId,
      name: formdata.get("name") as string,
      surname: formdata.get("surname") as string,
      role: formdata.get("role") as string,
      image: imageName as string,
    };
    console.log("PATCH Worker");
    // console.log(workerData);
    await updateWorker(workerData, request);
    return redirect(`/staff/${workerId}`);
  } else if (method === "delete") {
    console.log("DELETE Worker");
    await deleteWorker(workerId, request);
    console.log(`Worker with id: ${workerId} deleted`);
    return redirect("/staff");
  } else if (method === "post") {
    const image = formdata.get("profileImage") as File;
    const imageName = image.name ? image.name : null;

    const workerData = {
      id: workerId,
      name: formdata.get("name") as string,
      surname: formdata.get("surname") as string,
      role: formdata.get("role") as string,
      image: imageName as string,
    };
    await addWorker(workerData, request);
    console.log("Worker added");
    return redirect("/staff");
  } else {
    return redirect("/staff");
  }
}
