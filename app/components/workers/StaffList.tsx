import { Button, Card } from "flowbite-react";

import { Link, useFetcher } from "@remix-run/react";
import { RequestData, Worker } from "~/types/interfaces";

import {FaEye, FaUserCircle } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

interface DataStaff {
  workers: RequestData;
}

export function StaffList({ workers }: DataStaff) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state === "submitting";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full pb-2 w-full overflow-x-auto overflow-y-auto">
      {workers?.data ? (
        workers.data.map((worker: Worker) => (
          <Card key={worker.id} className="max-w-sm mb-3">
            <div className="flex flex-col items-center pt-4 pb-10">
              {worker.image ? (
                <img
                  alt={`${worker.name} ${worker.surname}`}
                  height="96"
                  src={`/workers/${worker.image}`}
                  width="96"
                  className="mb-3 rounded-full shadow-lg"ç
                />
              ) : (
                <FaUserCircle
                  className="mb-3 rounded-full shadow-lg w-24 h-24 bg-gray-900 dark:bg-gray-100"
                  tabIndex={0}
                  aria-label="User avatar"
                />
              )}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {`${worker.name} ${worker.surname}`}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {worker.role}
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <Link to={`${worker.id}`} tabIndex={0} aria-label="View worker details">
                  <Button className="w-8 h-8 flex items-center justify-center bg-green-400">
                    <FaEye />
                  </Button>
                </Link>
                <fetcher.Form method="post" action={`/staff/${worker.id}`}>
                  <input type="hidden" name="_method" value="delete" />
                  <Button
                    color="failure"
                    type="submit"
                    className="w-8 h-8 flex items-center justify-center"
                    disabled={isDeleting}
                    tabIndex={0}
                    aria-label="Delete worker"
                  >
                    <AiFillDelete />
                  </Button>
                </fetcher.Form>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <h2>No Workers</h2>
      )}
    </div>
  );
}
