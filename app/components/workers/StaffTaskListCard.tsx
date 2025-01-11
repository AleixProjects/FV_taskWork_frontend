import { Card, Dropdown } from "flowbite-react";
import React from "react";
import Image from "next/image";
import { Worker } from "~/types/interfaces";
import { FaUserCircle } from "react-icons/fa";

interface StaffTaskListCardProps {
  workers: Worker[] | undefined;
}

const StaffTaskListCard: React.FC<StaffTaskListCardProps> = ({ workers }) => {
  //   console.log("Workers: " + { workers });

  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Staff on the task
        </h5>
        <div>
          <Dropdown
            label="Add Worker"
            className="text-gray-900 dark:text-white"
          >
            <Dropdown.Item onClick={() => alert("Dashboard!")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => alert("Settings!")}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => alert("Earnings!")}>
              Earnings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => alert("Sign out!")}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {workers?.length > 0 ? (
            workers.map((worker) => {
              return (
                <li key={worker.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      {worker?.image ? (
                        <img
                          className="w-8 h-8 rounded-full shadow-lg mr-4"
                          src={`worker/${worker.image}`}
                          alt={`${worker?.name} ${worker?.surname}`}
                        />
                      ) : (
                        <FaUserCircle className="mb-3 rounded-full shadow-lg w-8 h-8 bg-gray-900 dark:bg-gray-100" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {worker.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {worker.surname}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ${worker.role}
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
                    Sorry there are no workers assigned
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

export default StaffTaskListCard;
