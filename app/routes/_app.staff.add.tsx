import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import Modal from "~/components/Utils/Modal";
import StaffForm from "~/components/workers/StaffForm";
import { validateWorker } from "~/data/validations.server";
import { addWorker } from "~/data/workers.server";
import { Worker } from "~/types/interfaces";

export default function TaskAdd() {
  const navigate = useNavigate();

  function closeHandler() {
    console.log("Close Modal");
    navigate("..");
  }
  return (
    <>
      <Modal onClose={closeHandler}>
        <StaffForm />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("POST Worker");
  const formData = await request.formData();
  const image = formData.get("profileImage") as File;
  const imageName = image.name ? image.name : null

  const workerData: Worker = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    role: formData.get("role") as string,
    image: imageName,
  };

  //Implementacio imatges

//   console.log(workerData);

  try {
    validateWorker(workerData);
  } catch (error) {
    return error;
  }

  await addWorker(workerData, request);
  return redirect("/staff");
}
