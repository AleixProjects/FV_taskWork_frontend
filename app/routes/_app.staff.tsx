import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";
import { MdAddToPhotos } from "react-icons/md";
import { StaffList } from "~/components/workers/StaffList";
import { getWorkers } from "~/data/workers.server";
import { Worker } from "~/types/interfaces";

export default function Staff() {
  const workers: Worker[] = useLoaderData() as Worker[];
  return (
    <>
      <Outlet />
      <div className="flex flex-col items-center justify-center max-h-screen p-4 bg-gray-100">
        <div className="h-screen w-full max-w-full pt-8">
          <div className="flex justify-end mb-4">
            <Button href="staff/add" className="flex items-center">
              <MdAddToPhotos className="mr-2 h-5 w-5" />
              Add Worker
            </Button>
          </div>
          <div className="w-full h-4/5 bg-white rounded-lg shadow-md p-4">
            <StaffList workers={workers} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await getWorkers(request);
}
