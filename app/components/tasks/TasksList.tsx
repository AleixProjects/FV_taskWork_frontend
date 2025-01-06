import { Table } from "flowbite-react";
import { Task } from "~/types/interfaces";

export function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Client</Table.HeadCell>
          <Table.HeadCell>Date Entry</Table.HeadCell>
          <Table.HeadCell>Date Ended</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Workers</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tasks ? (
            tasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>{task.client?.name}</Table.Cell>
                <Table.Cell>{task.startDate}</Table.Cell>
                <Table.Cell>{task.endDate}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>
                  {task.workers?.map((worker) => (
                    <span key={worker.id}>{worker.name}</span>
                  ))}
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