import { Outlet } from "@remix-run/react";

export default function Materials() {
    return (
        <>
            <Outlet />
            <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl text-gray-800">Materials</h1>
            </div>
        </>
    );
}