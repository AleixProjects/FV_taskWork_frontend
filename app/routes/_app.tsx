import { Outlet } from "react-router-dom";
import { BaseNavigation } from "app/components/navigation/BaseNavigation";
import { UserNavigation } from "app/components/navigation/UserNavigation";

export default function Index() {
  const user = true;

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div className="w-full sm:w-1/4">
          {user ? <UserNavigation /> : <BaseNavigation />}
        </div>
        <div className="w-full sm:ml-64 transition-transform sm:translate-x-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
