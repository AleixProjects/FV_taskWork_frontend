import { Button, Table } from "flowbite-react";
import { Task, RequestData } from "~/types/interfaces";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { StatusTag } from "./StatusTag";
import { useLoaderData, Link } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

import { deleteTask } from "~/data/tasks.server";
import { getToken } from "~/data/auth.server";
// import { deleteTask } from "~/data/tasks.server";

interface DataTask {
  tasks: RequestData;
}

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getToken(request);
  console.log(token);
  return token;
};

export function TasksList({ tasks }: DataTask) {
  const { token }: string = useLoaderData();
  // console.log(tasks.data);
  return (
    <div className="h-full w-full overflow-x-auto overflow-y-auto">
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Client</Table.HeadCell>
          <Table.HeadCell>Date Entry</Table.HeadCell>
          <Table.HeadCell>Date Ended</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Workers</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tasks.data ? (
            tasks.data.map((task: Task) => (
              <Table.Row key={task.id} className="cursor-pointer">
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>{task.client?.name}</Table.Cell>
                <Table.Cell>{task.start_date}</Table.Cell>
                <Table.Cell>{task.end_date}</Table.Cell>
                <Table.Cell>
                  <StatusTag status={task.status} editable={false} />
                </Table.Cell>
                <Table.Cell>
                  {task.workers?.map((worker) => (
                    <span key={worker.id}>{worker.name}</span>
                  ))}
                </Table.Cell>
                <Table.Cell className="flex space-x-2">
                  <Link to={`${task.id}`}>
                    <Button className="w-8 h-8 flex items-center justify-center bg-green-400">
                      <FaEye />
                    </Button>
                  </Link>
                  <Button
                    color="failure"
                    className="w-8 h-8 flex items-center justify-center"
                    // onClick={deleteTask(task.id, token)}
                  >
                    <AiFillDelete />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={7} className="text-center">
                No tasks
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
