import {
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
  useFetcher,
} from "@remix-run/react";
import { Button } from "flowbite-react";
import { Worker, ValidationErrors } from "~/types/interfaces";
import { RxCross2 } from "react-icons/rx";


const StaffForm: React.FC = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const params = useParams();

  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.staff"
  );

  const workerData = (matchedRoute?.data?.data as Worker[]).find(
    ({ id }) => id == params.id
  ) || {
    id: false,
    name: "",
    surname: "",
    role: "",
  };

  console.log(workerData);

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const fetcher = useFetcher();

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
                {workerData.id
                  ? "Modify worker: " + workerData.name
                  : "Add worker"}
              </h3>
              <Link
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                prefetch="none"
                to=".."
              >
                <RxCross2 />
                <span className="sr-only">Close modal</span>
              </Link>
            </div>
            <fetcher.Form
              encType="multipart/form-data"
              method="post"
              id="worker-form"
              action={`/staff/${workerData?.id}`}
            >
              <input
                type="hidden"
                name="_method"
                value={workerData.id ? "patch" : "post"}
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
                    placeholder="Write the name of the worker"
                    defaultValue={workerData?.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    tabIndex={0}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder="Write the name of the worker"
                    defaultValue={workerData?.surname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    tabIndex={0}
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    tabIndex={0}
                  >
                    <option selected={workerData ? false : true}>
                      Select role
                    </option>
                    <option
                      selected={workerData?.role === "factory" ? true : false}
                      value="factory"
                    >
                      Factory
                    </option>
                    <option
                      selected={
                        workerData?.role === "office" ? true : false
                      }
                      value="office"
                    >
                      Office
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image Worker
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    tabIndex={0}
                  />
                </div>
              </div>
              {validationErrors && (
                <ul className="mb-4 list-inside list-disc text-red-500">
                  {Object.values(validationErrors).map((error: string) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
              <Button type="submit" disabled={isSubmitting} tabIndex={0}>
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
                  : workerData
                  ? "Save Changes"
                  : "Add Worker"}
              </Button>
            </fetcher.Form>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
    </>
  );
};

export default StaffForm;
