import { Avatar, Button, Table } from "flowbite-react";
import { Task, RequestData } from "~/types/interfaces";
import { FaEye, FaUserCircle } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useFetcher, Link } from "@remix-run/react";
import { StatusTag } from "./StatusTag";

interface DataTask {
  tasks: RequestData;
}

export function TasksList({ tasks }: DataTask) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state === "submitting";

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
          {tasks.data.length > 0 ? (
            tasks.data.map((task: Task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>
                  {task.client !== undefined
                    ? task.client.name
                    : "No client assigned"}
                </Table.Cell>
                <Table.Cell>{task.start_date}</Table.Cell>
                <Table.Cell>{task.end_date}</Table.Cell>
                <Table.Cell>
                  <StatusTag status={task.status} editable={false} />
                </Table.Cell>
                <Table.Cell>
                  {task.workers && task.workers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      <Avatar.Group>
                        {task.workers.map((worker) => (
                          worker.image ? (
                          <Avatar
                            key={worker.id}
                            img={`/worker/${worker.image}`}
                            rounded
                            stacked
                            title={worker.name}
                          />
                          ) : (
                          <FaUserCircle
                            key={worker.id}
                            className="mb-3 rounded-full shadow-lg w-8 h-8 bg-gray-900 dark:bg-gray-100"
                            title={worker.name + " " + worker.surname}
                          />
                          )
                        ))}
                      </Avatar.Group>
                    </div>
                  ) : (
                    "No workers assigned"
                  )}
                </Table.Cell>
                <Table.Cell className="flex space-x-2">
                  <Link to={`${task.id}`}>
                    <Button className="w-8 h-8 flex items-center justify-center bg-green-400">
                      <FaEye />
                    </Button>
                  </Link>
                  <fetcher.Form method="DELETE" action={`/tasks/${task.id}`}>
                    <input type="hidden" name="_method" value="delete" />
                    <Button
                      color="failure"
                      type="submit"
                      className="w-8 h-8 flex items-center justify-center"
                      disabled={isDeleting}
                    >
                      <AiFillDelete />
                    </Button>
                  </fetcher.Form>
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
        -
      </Table>
    </div>
  );
}
