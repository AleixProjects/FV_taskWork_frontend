import React from "react";
import { Task, ValidationErrors } from "~/types/interfaces";
import {
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { StatusTag } from "./StatusTag";

const TaskDetail: React.FC = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const matches = useMatches();
  const params = useParams();
  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.tasks"
  );
  console.log(matchedRoute);
  const taskData = (matchedRoute.data.data as Task[]).find(
    ({ id }) => id == params.id
  );

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  return (
    <>
      {taskData ? (
        <div className="p-6 rounded-l-md shadow-lg w-full h-full flex flex-col items-start justify-center overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {taskData.name}
          </h2>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Client:</strong> {taskData.client?.name}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Description:</strong> {taskData.description}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Date Entry:</strong> {taskData.start_date}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Date Ended:</strong> {taskData.end_date}
          </p>
          <div className="mb-2 text-gray-700 dark:text-gray-300">
            <StatusTag status={taskData.status} editable={false} />
          </div>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>Workers:</strong>{" "}
            {taskData.workers?.map((worker) => worker.name).join(", ")}
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-l-md shadow-lg w-full h-full flex flex-col items-start justify-center overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            No Data
          </h2>
        </div>
      )}
    </>
  );
};

export default TaskDetail;
