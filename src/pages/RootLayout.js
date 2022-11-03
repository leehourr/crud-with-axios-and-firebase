import { memo } from "react";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen flex items-center align-text-top flex-col bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-fit space-y-8 p-0">
          <h2 className="mt-6 mb-10 text-center text-3xl font-extrabold text-cyan-400 cursor-pointer">
            CONTACT
          </h2>
        </div>
        <Outlet />
      </div>
    </>
  );
};
