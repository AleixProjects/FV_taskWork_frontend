import { useState } from "react";
import { Table, Avatar, Button } from "flowbite-react";
import { RequestData, Task } from "~/types/interfaces";
import { Link, useFetcher } from "@remix-run/react";
import { StatusTag } from "./StatusTag";
import { FaEye, FaUserCircle } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

interface DataTask {
  tasks: RequestData;
}

export function TasksList({ tasks }: DataTask) {
  const fetcher = useFetcher();
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const filteredTasks = tasks.data?.filter((task: Task) => {
    const matchesName = filter
      ? task.name.toLowerCase().includes(filter.toLowerCase())
      : true;
    const matchesStartDate = startDate
      ? new Date(task.start_date) >= new Date(startDate)
      : true;
    const matchesEndDate = endDate
      ? new Date(task.end_date) <= new Date(endDate)
      : true;
    const matchesStatus = status ? task.status === status : true;
    return matchesName && matchesStartDate && matchesEndDate && matchesStatus;
  });

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-auto">
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <fetcher.Form method="get" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label
                htmlFor="filter"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Filter tasks
              </label>
              <input
                type="text"
                id="filter"
                name="filter"
                value={filter}
                onChange={handleFilterChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Filter by task name"
              />
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={handleStatusChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="pending_revision">Pending Revision</option>
                <option value="waiting_accept">Waiting Accept</option>
                <option value="to_start">To Start</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="payment_pending">Payment Pending</option>
                <option value="paid">Paid</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </Button>
            </div>
          </div>
        </fetcher.Form>
      </div>
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
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>
                  {task.client?.length > 0
                    ? task.client?.name
                    : "No client assigned"}
                </Table.Cell>
                <Table.Cell>{task.start_date}</Table.Cell>
                <Table.Cell>{task.end_date}</Table.Cell>
                <Table.Cell>
                  <StatusTag status={task.status} />
                </Table.Cell>
                <Table.Cell>
                  {task.workers && task.workers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      <Avatar.Group>
                        {task.workers.map((worker) =>
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
                        )}
                      </Avatar.Group>
                    </div>
                  ) : (
                    "No workers assigned"
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Link to={`/tasks/${task.id}`}>
                      <Button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white">
                        <FaEye />
                      </Button>
                    </Link>
                    <fetcher.Form method="post" action={`/tasks/${task.id}`}>
                      <input type="hidden" name="_method" value="delete" />
                      <Button
                        color="failure"
                        type="submit"
                        className="w-8 h-8 flex items-center justify-center"
                        disabled={fetcher.state === "submitting"}
                      >
                        <AiFillDelete />
                      </Button>
                    </fetcher.Form>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={7} className="text-center">
                No tasks found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
