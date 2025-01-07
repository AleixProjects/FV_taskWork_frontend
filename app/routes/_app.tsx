import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { BaseNavigation } from "app/components/navigation/BaseNavigation";
import { UserNavigation } from "app/components/navigation/UserNavigation";
import { getToken, getUser } from "~/data/auth.server";
import { User } from "~/types/interfaces";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<User | null> {
  const user = getUser(request);
  return user;
}

export default function Index(): JSX.Element {
  const user = useLoaderData<User>();

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div className="w-full sm:w-1/4">
          {user ? <UserNavigation /> : <BaseNavigation />}
        </div>
        <div className=" sm:ml-64 transition-transform sm:translate-x-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
