import { useNavigate } from "@remix-run/react";
import Modal from "~/components/Utils/Modal";
import { redirect } from "@remix-run/node";
import { deleteWorker } from "~/data/workers.server";

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
  const workerId = params.id as string;
  const formdata = await request.formData();
  const method = await formdata.get("_method");

  if (method === "patch") {
    redirect(`/staff/${workerId}`);
  } else if (method === "delete") {
    await deleteWorker(workerId, request);
    console.log(`Worker with id: ${workerId} deleted`);

    return redirect("/staff");
  }
}
