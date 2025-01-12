import { Link, useFetcher } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { Material } from "~/types/interfaces";

import { FaEye} from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export function MaterialList({ materials }: { materials: Material[] }) {
  const fetcher = useFetcher();

  const isDeleting = fetcher.state === "submitting";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full pb-2 w-full overflow-x-auto overflow-y-auto">
      {materials.data.map((material: Material) => (
        <Card key={material.id} className="max-w-sm mb-3">
          <div className="flex flex-col items-center pt-4 pb-10">
            <div className="flex items-center justify-center w-fit max-h-48 mb-3 overflow-hidden">
              <img
                alt={material.name}
                src={
                  material.image !== null
                    ? `/materials/${material.image}`
                    : "/materials/default.png"
                }
                className="mb-3 w-fit overflow-hidden"
              />
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {material.name}
            </h5>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Link to={`${material.id}`} tabIndex={0}>
                <Button className="w-8 h-8 flex items-center justify-center bg-green-400" tabIndex={-1}>
                  <FaEye />
                </Button>
              </Link>
              <fetcher.Form method="post" action={`/materials/${material.id}`}>
                <input type="hidden" name="_method" value="delete" />
                <Button
                  color="failure"
                  type="submit"
                  className="w-8 h-8 flex items-center justify-center"
                  disabled={isDeleting}
                  tabIndex={0}
                >
                  <AiFillDelete />
                </Button>
              </fetcher.Form>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
