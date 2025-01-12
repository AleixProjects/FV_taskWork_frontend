import React, { useState } from "react";
import { Task, ValidationErrors } from "~/types/interfaces";
import {
  Link,
  useActionData,
  useFetcher,
  useMatches,
  useNavigation,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { StatusTag } from "./StatusTag";
import StaffTaskListCard from "../workers/StaffTaskListCard";
import { Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import TaskForm from "./TaskForm";
import MaterialTaskListCard from "../materials/MaterialTaskListCard";
import { RxCross2 } from "react-icons/rx";

const TaskDetail: React.FC = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const matches = useMatches();
  const params = useParams();
  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.tasks"
  );
  console.log(matchedRoute);
  const taskData = (matchedRoute.data.tasks.data as Task[]).find(
    ({ id }) => id == params.id
  );

  console.log(taskData);

  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("mode") === "edit";

  const [isDeleting, setIsDeleting] = useState(false);

  const handleIsDeleting = () => {
    setIsDeleting(true);
  };

  const fetcher = useFetcher();

  return (
    <>
      {editMode ? (
        <TaskForm />
      ) : taskData ? (
        <section className="px-8 py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-1 lg:gap-8 xl:gap-16">
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {taskData.name}
                  </h1>

                  <div className="flex justify-around w-1/6">
                    <div>
                      <Link
                        to={`?mode=edit`}
                        tabIndex={0}
                        aria-label="Edit task"
                      >
                        <Button className="w-8 h-8 flex rounded-lg items-center justify-center bg-yellow-400 ">
                          <FaEdit />
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <fetcher.Form
                        method="DELETE"
                        action={`/tasks/${taskData?.id}`}
                      >
                        <input type="hidden" name="_method" value="delete" />
                        <Button
                          color="failure"
                          type="submit"
                          className="w-8 h-8 flex items-center justify-center"
                          onClick={handleIsDeleting}
                          disabled={isDeleting}
                          tabIndex={0}
                          aria-label="Delete task"
                        >
                          <AiFillDelete />
                        </Button>
                      </fetcher.Form>
                    </div>
                    <div>
                      <Link
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        prefetch="none"
                        to=".."
                        tabIndex={0}
                        aria-label="Close modal"
                      >
                        <RxCross2 />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <StatusTag status={taskData.status} editable={false} />
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Description
                  </h2>
                  <textarea
                    className="block p-2.5 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 min-h-fit-content"
                    readOnly
                  >
                    {taskData.description ? (
                      taskData.description
                    ) : (
                      <strong>(No description)</strong>
                    )}
                  </textarea>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total hours:
                  </h2>
                  <p className="text-lg mb-6 text-gray-500 dark:text-gray-400 max-h-96 overflow-auto">
                    {taskData.total_time + "h"}
                  </p>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                  <div className="w-full lg:w-1/2">
                    <StaffTaskListCard
                      task={taskData}
                      workersTask={taskData.workers}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <MaterialTaskListCard
                      task={taskData}
                      materialsTask={taskData.materials}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
