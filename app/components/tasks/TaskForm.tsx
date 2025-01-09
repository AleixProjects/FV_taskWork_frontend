import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Button, Datepicker } from "flowbite-react";
import { Task, ValidationErrors } from "~/types/interfaces";

const TaskForm: React.FC = () => {
  const today = new Date().toLocaleDateString("sv").slice(0, 10);

  const validationErrors = useActionData<ValidationErrors>();

  const params = useParams();

  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.tasks"
  );

  const taskData = (matchedRoute?.data?.data as Task[]).find(
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
                {taskData.id ? "Modify task: "+taskData.name : "Add task"}
              </h3>
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
                <span className="sr-only">Close modal</span>
              </Link>
            </div>
            <Form method={taskData.id ? "patch" : "post"} id="task-form">
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
                    defaultValue={taskData?.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
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
                  <Datepicker
                    pattern="Y-m-d"
                    defaultValue={
                      taskData && taskData.start_date ? new Date(taskData.start_date) : new Date(today)
                    }
                    name="start_date"
                    id="start_date"
                  />
                  ;
                </div>

                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ending date
                  </label>
                  <Datepicker
                    pattern="Y-m-d"
                    defaultValue={
                        taskData && taskData.end_date ? new Date(taskData.end_date) : new Date(today)
                    }
                    minDate={new Date(today)}
                    name="end_date"
                    id="end_date"
                  />
                  ;
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
                    defaultValue="0"
                    min={0}
                    max={999}
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
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
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
              <Button type="submit" disabled={isSubmitting}>
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {isSubmitting ? "Saving..." : "Submit task"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
