import React from "react";
import { Link, redirect } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center align-text-top flex-col bg-zinc-800 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto">
        <h2 className="mt-6 mb-10 text-center text-3xl font-extrabold text-green-400 cursor-pointer">
          404
        </h2>
        <h3 className="mt-6 mb-10 text-center text-3xl font-extrabold text-green-400 cursor-pointer">
          Page not found
        </h3>
        <button className="text-cyan-200 w-full mx-auto border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 px-2 nm-flat-zinc-800 transition ease-in-out delay-150 duration-1000">
          <Link to={"/"}>Back to contact</Link>
        </button>
      </div>
    </div>
  );
};
