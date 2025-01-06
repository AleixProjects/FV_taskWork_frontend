import { Outlet, useLoaderData } from "@remix-run/react";
import { TasksList } from "../components/tasks/TasksList";
import { Task } from "~/types/interfaces";

export default function Tasks() {
  const tasks = useLoaderData() as Task[];

  return (
    <>
      <Outlet />
      {/* <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-800">Tasks</h1>
      </div> */}
      <TasksList tasks={tasks} />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
    return await getTasks(request);
  }
