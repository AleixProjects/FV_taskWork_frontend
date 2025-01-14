import React, { useState } from "react";
import {
  Link,
  useActionData,
  useFetcher,
  useMatches,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { Button } from "flowbite-react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { ValidationErrors, Worker } from "~/types/interfaces";
import StaffForm from "./StaffForm";
import StaffTaskList from "./StaffTaskList";
import { RxCross2 } from "react-icons/rx";

const StaffDetail: React.FC = () => {
  const validationErrors = useActionData<ValidationErrors>();

  const matches = useMatches();
  const params = useParams();
  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.staff"
  );
  console.log(matchedRoute);
  const workerData = (matchedRoute.data.data as Worker[]).find(
    ({ id }) => id == params.id
  );

  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("mode") === "edit";

  const fetcher = useFetcher();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleIsDeleting = () => {
    setIsDeleting(true);
  };

  console.log(workerData);

  return (
    <>
      {editMode ? (
        <StaffForm />
      ) : workerData ? (
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
                    aria-label="Close modal"
                  >
                    <RxCross2 />
                    <span className="sr-only">Close modal</span>
                  </Link>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="flex flex-row items-start justify-between">
                  <div className="flex items-center">
                    {workerData?.image ? (
                      <img
                        className="w-24 h-24 rounded-full shadow-lg mr-4"
                        src={`/workers/${workerData.image}`}
                        alt={`${workerData?.name} ${workerData?.surname}`}
                      />
                    ) : (
                      <FaUserCircle
                        className="mb-3 rounded-full shadow-lg w-24 h-24 bg-gray-900 dark:bg-gray-100"
                        tabIndex={0}
                        aria-label="User avatar"
                      />
                    )}
                    <div className="pl-6">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {workerData?.name + " "} {workerData?.surname}
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400">
                        {workerData?.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link to={`?mode=edit`} tabIndex={0} aria-label="Edit worker">
                      <Button className="w-8 h-8 mr-3 flex rounded-lg items-center justify-center bg-yellow-400">
                        <FaEdit />
                      </Button>
                    </Link>
                    <fetcher.Form
                      method="DELETE"
                      action={`/staff/${workerData?.id}`}
                    >
                      <input type="hidden" name="_method" value="delete" />
                      <Button
                        color="failure"
                        type="submit"
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={handleIsDeleting}
                        disabled={isDeleting}
                        tabIndex={0}
                        aria-label="Delete worker"
                      >
                        <AiFillDelete />
                      </Button>
                    </fetcher.Form>
                  </div>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <div className="grid grid-rows-2 gap-4">
                  {workerData && workerData.tasks && workerData.tasks.length > 0 ? (
                    <StaffTaskList tasks={workerData.tasks} />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No tasks assigned.
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

export default StaffDetail;
