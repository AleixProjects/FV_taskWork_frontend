import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { Material, Task } from "~/types/interfaces";
import { FaUserCircle } from "react-icons/fa";
import { useFetcher, useMatches } from "@remix-run/react";
import { AiFillDelete } from "react-icons/ai";

interface MaterialTaskListCardProps {
  materialsTask: Material[] | undefined;
  task: Task;
}

const MaterialTaskListCard: React.FC<MaterialTaskListCardProps> = ({
  materialsTask,
  task,
}) => {
  const [handleDropdown, setHandleDropdown] = useState(false);
  const toggleDropdown = () => {
    setHandleDropdown(!handleDropdown);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const handleIsDeleting = () => {
    setIsDeleting(true);
  };

  const fetcher = useFetcher();

  const matches = useMatches();
  const matchedRoute = matches?.find(
    (match) => match.id === "routes/_app.tasks"
  );
  const materials = matchedRoute?.data?.materials?.data as Material[];

  //   console.log(materials);

  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Materials used
        </h5>
        <div>
          <fetcher.Form
            method="post"
            action={`/tasks/materials/add`}
            className="max-w-sm mx-auto"
          >
            <input type="hidden" name="_method" value="post" />
            <input type="hidden" name="task_id" value={task.id} />
            <div className="relative inline-block text-left">
              <Button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-1 py-1 bg-white dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                id="menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={toggleDropdown}
                tabIndex={0}
              >
                Add Material
              </Button>
              <div
                id="dropdown-menu"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  handleDropdown ? "" : "hidden"
                }`}
              >
                <div className="py-1 w-full" role="none">
                  {materials?.map((material) => {
                    return (
                      <div
                        key={material.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        <input type="hidden" name="task_id" value={task.id} />
                        <Button
                          type="submit"
                          name="material_id"
                          value={material.id}
                          color="none"
                          className="block w-full text-left text-sm text-gray-700 dark:text-gray-300"
                          tabIndex={0}
                        >
                          <div className="flex items-center space-x-2">
                            <img
                              src={
                                material.image
                                  ? `/materials/${material.image}`
                                  : "/materials/default.png"
                              }
                              alt={material.name}
                            />
                            <span>{material.name}</span>
                          </div>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {materialsTask?.length > 0 ? (
            materialsTask.map((material) => {
              return (
                <li key={material.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 group">
                    <div className="shrink-0">
                      <img
                        alt={material.name}
                        src={
                          material.image !== null
                            ? `/materials/${material.image}`
                            : "/materials/default.png"
                        }
                        className="mb-3 h-12 overflow-hidden"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {material.name}
                      </p>
                    </div>
                    <div className="hidden group-hover:block">
                      <fetcher.Form method="post" action={`/tasks/materials`}>
                        <input type="hidden" name="_method" value="delete" />
                        <input type="hidden" name="task_id" value={task.id} />
                        <input
                          type="hidden"
                          name="material_id"
                          value={material.id}
                        />
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
                </li>
              );
            })
          ) : (
            <>
              <li className="py-3 sm:py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Sorry there are no materials assigned
                  </p>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default MaterialTaskListCard;
