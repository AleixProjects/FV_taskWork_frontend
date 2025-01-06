import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Outlet />
      <h1 className="relative">Hello, World!</h1>
    </>
  );
}
