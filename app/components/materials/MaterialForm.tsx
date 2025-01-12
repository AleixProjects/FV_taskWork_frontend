import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { Button } from "flowbite-react";
import { Material, ValidationErrors } from "~/types/interfaces";

const MaterialForm: React.FC = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const params = useParams();

  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.materials"
  );

  const materialData = (matchedRoute?.data?.data as Material[]).find(
    ({ id }) => id == params.id
  ) || {
    id: false,
    name: "",
    description: "",
    image: "",
  };

  console.log(materialData);

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
                {materialData.id
                  ? "Modify material: " + materialData.name
                  : "Add material"}
              </h3>
              <Link
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                prefetch="none"
                to=".."
                tabIndex={0}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm0 18.75c-4.914 0-8.75-3.836-8.75-8.75S5.086 1.25 10 1.25s8.75 3.836 8.75 8.75-3.836 8.75-8.75 8.75z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 4.375a.625.625 0 00-.625.625v8.75a.625.625 0 001.25 0v-8.75a.625.625 0 00-.625-.625z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 4.375a.625.625 0 00-.625.625v8.75a.625.625 0 001.25 0v-8.75a.625.625 0 00-.625-.625z"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </Link>
            </div>
            <Form
              method="post"
              action={
                materialData.id ? `/materials/${materialData.id}` : "/materials/add"
              }
              encType="multipart/form-data"
              id="material-form"
            >
              <input
                type="hidden"
                name="_method"
                value={materialData.id ? "patch" : "post"}
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
                    defaultValue={materialData.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    tabIndex={0}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={materialData.description}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    tabIndex={0}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image Material
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    tabIndex={0}
                  />
                </div>
              </div>
              {validationErrors && (
                <div className="text-red-500 text-sm mb-4">
                  {Object.values(validationErrors).map((error, index) => (
                    <p key={index}>{error as string}</p>
                  ))}
                </div>
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
                  : materialData
                  ? "Save Changes"
                  : "Add Material"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialForm;
