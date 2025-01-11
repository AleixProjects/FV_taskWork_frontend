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
                      <Link to={`?mode=edit`}>
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
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
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
                  <p className="mb-6 text-gray-500 dark:text-gray-400 max-h-96 overflow-auto">
                    {taskData.description}
                  </p>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="grid grid-rows-2">
                  <StaffTaskListCard
                    workers={taskData.workers}
                  ></StaffTaskListCard>
                  {/* <MaterialTaskListCard materials={material} */}
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
