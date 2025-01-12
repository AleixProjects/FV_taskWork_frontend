import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Button } from "flowbite-react";
import { Task, ValidationErrors } from "~/types/interfaces";
import { RxCross2 } from "react-icons/rx";

const TaskForm: React.FC = () => {
  const today = new Date().toLocaleDateString("sv").slice(0, 10);

  const validationErrors = useActionData<ValidationErrors>();

  const params = useParams();

  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.tasks"
  );

  const taskData = (matchedRoute?.data?.tasks.data as Task[]).find(
    ({ id }) => id == params.id
  ) || {
    id: false,
    name: "",
    description: "",
    start_date: today,
    end_date: "",
    total_time: 0,
    status: "pending_revision",
  };

  console.log(taskData);

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden z-50 align-middle justify-center items-center w-full h-modal md:h-full flex-col"
      >
        <div className="relative p-4 w-full h-full flex items-center justify-center">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 w-full h-full ">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {taskData.id ? "Modify task: " + taskData.name : "Add task"}
              </h3>
              <Link
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                prefetch="none"
                to=".."
                tabIndex={0}
                aria-label="Close modal"
              >
                <RxCross2 />
                <span className="sr-only">Close modal</span>
              </Link>
            </div>
            <Form method="post" id="task-form">
              <input
                type="hidden"
                name="_method"
                value={taskData.id ? "patch" : "post"}
              />
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Write the name of the task"
                    defaultValue={taskData?.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    tabIndex={0}
                    aria-label="Task name"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    tabIndex={0}
                    aria-label="Task status"
                  >
                    <option selected={taskData ? false : true}>
                      Select status
                    </option>
                    <option
                      selected={
                        taskData?.status === "pending_revision" ? true : false
                      }
                      value="pending_revision"
                    >
                      Pending Revision
                    </option>
                    <option
                      selected={
                        taskData?.status === "waiting_accept" ? true : false
                      }
                      value="waiting_accept"
                    >
                      Waiting Accept
                    </option>
                    <option
                      selected={taskData?.status === "to_start" ? true : false}
                      value="to_start"
                    >
                      To Start
                    </option>
                    <option
                      selected={
                        taskData?.status === "in_progress" ? true : false
                      }
                      value="in_progress"
                    >
                      In Progress
                    </option>
                    <option
                      selected={
                        taskData?.status === "pending_cashing" ? true : false
                      }
                      value="pending_cashing"
                    >
                      Pending Cashing
                    </option>
                    <option
                      selected={taskData?.status === "cashed" ? true : false}
                      value="cashed"
                    >
                      Cashed
                    </option>
                    <option
                      selected={taskData?.status === "cancelled" ? true : false}
                      value="cancelled"
                    >
                      Cancelled
                    </option>
                    <option
                      selected={taskData?.status === "closed" ? true : false}
                      value="closed"
                    >
                      Closed
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="start_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Starting date
                  </label>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-900 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="start_date"
                      id="datepicker-autohide"
                      type="date"
                      defaultValue={taskData.start_date}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      tabIndex={0}
                      aria-label="Task start date"
                    ></input>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ending date
                  </label>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-900 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="end_date"
                      id="datepicker-autohide"
                      type="date"
                      defaultValue={taskData.end_date}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      tabIndex={0}
                      aria-label="Task end date"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="total_time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Time
                  </label>
                  <input
                    type="number"
                    name="total_time"
                    id="total_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="0"
                    defaultValue={taskData.total_time}
                    min={0}
                    max={999}
                    tabIndex={0}
                    aria-label="Total time"
                  ></input>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={taskData.description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write task description here"
                    tabIndex={0}
                    aria-label="Task description"
                  ></textarea>
                </div>
              </div>
              {validationErrors && (
                <ul className="mb-4 list-inside list-disc text-red-500">
                  {Object.values(validationErrors).map((error: string) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                tabIndex={0}
                aria-label="Save task"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {isSubmitting
                  ? "Saving..."
                  : taskData
                  ? "Save Task"
                  : "Add Task"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    </>
  );
};

export default TaskForm;
