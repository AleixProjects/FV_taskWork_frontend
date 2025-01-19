import React from "react";
import { useLoaderData } from "@remix-run/react";
import Dashboard from "~/components/Dashboards/Dashboard";
import { Task } from "~/types/interfaces";
import { getTasks } from "~/data/tasks.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Fetch tasks data from your data source
  const tasks: Task[] = await getTasks(request);
  return { tasks };
};

const DashboardPage = () => {
  const { tasks } = useLoaderData<{ tasks: Task[] }>();

  return <Dashboard tasks={tasks} />;
};

export default DashboardPage;
