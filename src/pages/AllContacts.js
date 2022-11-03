import React, { Fragment, Suspense, useState } from "react";
import {
  defer,
  useLoaderData,
  Await,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ContactList } from "../components/Contact/ContactList";
import { Card } from "../components/Ui/Card";
import { LoadingSpinner } from "../components/Ui/LoadingSpinner";
import { getAllContacts } from "../util/api";
import { AddContact } from "./AddContact";

export const AllContacts = () => {
  const loaderData = useLoaderData();
  const path = useLocation();
  const navigate = useNavigate();

  const addFormHandler = () => {
    console.log("form opened");
    navigate("/add-contact");
  };
  // console.log("load data from page");

  //console.log(loaderData);
  return (
    <div className="min-h-screen flex items-center align-text-top flex-col bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-fit space-y-8 p-0">
        <h2 className="mt-6 mb-10 text-center text-3xl font-extrabold text-cyan-400 cursor-pointer">
          CONTACT
        </h2>
      </div>
      <div className="flex flex-row space-x-14">
        <input
          type="text"
          id="search"
          name="search"
          //  value={search}
          //    onChange={searchHandler}
          className="border-cyan-200  text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
          placeholder="Search name"
        />
        <div className="text-cyan-200 border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 p-0.5 nm-flat-gray-800 transition ease-in-out delay-150 duration-1000">
          <button onClick={addFormHandler} className="w-8">
            +
          </button>
        </div>
      </div>
      <div className=""></div>
      <Outlet />
      <Suspense
        fallback={
          <Card
            className={
              "text-white nm-flat-gray-800 max-w-lg w-full p-4 rounded-lg mt-6 "
            }
          >
            <LoadingSpinner />
          </Card>
        }
      >
        <Await
          resolve={loaderData.contact}
          errorElement={<p className="text-white ">Error loading contacts.</p>}
        >
          {(loaderData) => <ContactList contact={loaderData} />}
        </Await>
      </Suspense>
    </div>
  );
};

export const loader = async () => {
  return defer({ contact: getAllContacts() });
};
