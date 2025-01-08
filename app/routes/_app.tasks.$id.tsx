import { useNavigate } from "@remix-run/react";
import { Button } from "flowbite-react";
import TaskDetail from "~/components/tasks/TaskDetail";
import Modal from "~/components/Utils/Modal";
import { IoMdArrowRoundBack } from "react-icons/io";

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
