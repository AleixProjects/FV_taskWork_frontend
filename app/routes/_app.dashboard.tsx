import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Outlet />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-800">Dashboard</h1>
      </div>
    </>
  );
}
