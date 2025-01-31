import { Outlet, useLoaderData } from "@remix-run/react";
import { TasksList } from "../components/tasks/TasksList";
import { Task, Worker } from "~/types/interfaces";
import { getTasks } from "~/data/tasks.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "flowbite-react";
import { MdAddToPhotos } from "react-icons/md";
import { getWorkers } from "~/data/workers.server";
import { getMaterial, getMaterials } from "~/data/materials.server";

export default function Tasks() {
  const { tasks } = useLoaderData() as Task[];

  return (
    <>
      <Outlet />
      <div className="flex flex-col items-center justify-center max-h-screen p-4 bg-gray-100">
        <div className="h-screen w-full max-w-full pt-8">
          <div className="flex justify-end mb-4">
            <Button href="tasks/add" className="flex items-center">
              <MdAddToPhotos className="mr-2 h-5 w-5" />
              Add Task
            </Button>
          </div>
          <div className="w-full h-4/5 bg-white rounded-lg shadow-md p-4">
            <TasksList tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = {
    tasks: await getTasks(request),
    workers: await getWorkers(request),
    materials: await getMaterials(request),
  };
  return data;
}
