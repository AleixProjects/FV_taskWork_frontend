import { Outlet } from "@remix-run/react";

export default function Staff() {
  return (
    <>
      <Outlet />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-800">Staff</h1>
      </div>
    </>
  );
}
