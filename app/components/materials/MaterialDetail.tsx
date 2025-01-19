import {
  Link,
  useActionData,
  useFetcher,
  useMatches,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import { Material, ValidationErrors } from "~/types/interfaces";
import MaterialForm from "./MaterialForm";
import { Button } from "flowbite-react";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import MaterialTaskList from "./MaterialTaskList";

const MaterialDetail = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const matches = useMatches();
  const params = useParams();
  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.materials"
  );
  console.log(matchedRoute);
  const materialData = (matchedRoute.data.data as Material[]).find(
    ({ id }) => id == params.id
  );

  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("mode") === "edit";

  const fetcher = useFetcher();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleIsDeleting = () => {
    setIsDeleting(true);
  };

  return (
    <>
      {editMode ? (
        <MaterialForm />
      ) : materialData ? (
        <section className="px-8 py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-1 lg:gap-8 xl:gap-16">
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <div className="flex">
                  <Link
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    prefetch="none"
                    to=".."
                    tabIndex={0}
                  >
                    <RxCross2 />
                    <span className="sr-only">Close modal</span>
                  </Link>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="flex flex-col items-start justify-between">
                  <div className="w-full h-40 overflow-hidden flex items-center justify-center">
                    <img
                      alt={materialData.name}
                      src={
                        materialData.image !== null
                          ? `/materials/${materialData.image}`
                          : "/materials/default.png"
                      }
                      className="mb-3 w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pt-10">
                      {materialData?.name}
                    </h1>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link to={`?mode=edit`} tabIndex={0}>
                      <Button className="w-8 h-8 mr-3 flex rounded-lg items-center justify-center bg-yellow-400" tabIndex={-1}>
                        <FaEdit />
                      </Button>
                    </Link>
                    <fetcher.Form
                      method="DELETE"
                      action={`/staff/${materialData?.id}`}
                    >
                      <input type="hidden" name="_method" value="delete" />
                      <Button
                        color="failure"
                        type="submit"
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={handleIsDeleting}
                        disabled={isDeleting}
                        tabIndex={0}
                      >
                        <AiFillDelete />
                      </Button>
                    </fetcher.Form>
                  </div>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <textarea
                  className="block p-2.5 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 min-h-fit-content"
                  rows={4}
                  value={materialData?.description}
                  readOnly
                  tabIndex={0}
                ></textarea>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="grid grid-rows-2 gap-4">
                  {materialData &&
                  materialData.tasks &&
                  materialData.tasks.length > 0 ? (
                    // <MaterialTaskList tasks={materialData.tasks} />
                    <>material</>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Material not used.
                    </p>
                  )}
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

export default MaterialDetail;
