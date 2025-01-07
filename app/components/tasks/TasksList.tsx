import { Button, Table } from "flowbite-react";
import { Task, RequestData } from "~/types/interfaces";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { StatusTag } from "./StatusTag";

export function TasksList({ tasks }: RequestData) {
  //   console.log(tasks);
  //   const tasks: Task[] = request.data;
  return (
    <div className="w-full overflow-x-auto overflow-y-auto">
      <Table striped>
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
                <Table.Cell>{task.client?.name}</Table.Cell>
                <Table.Cell>{task.startDate}</Table.Cell>
                <Table.Cell>{task.endDate}</Table.Cell>
                <Table.Cell><StatusTag status={task.status} editable={false}/></Table.Cell>
                <Table.Cell>
                  {task.workers?.map((worker) => (
                    <span key={worker.id}>{worker.name}</span>
                  ))}
                </Table.Cell>
                <Table.Cell className="flex space-x-2">
                  <Button className="w-8 h-8 flex items-center justify-center bg-yellow-300">
                    <FaEdit />
                  </Button>
                  <Button color="failure" className="w-8 h-8 flex items-center justify-center">
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
