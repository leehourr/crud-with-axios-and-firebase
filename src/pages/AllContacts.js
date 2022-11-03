import React, { Fragment, Suspense, useState } from "react";
import { defer, useLoaderData, Await, Outlet } from "react-router-dom";

import { ContactList } from "../components/Contact/ContactList";
import { Card } from "../components/Ui/Card";
import { LoadingSpinner } from "../components/Ui/LoadingSpinner";
import { getAllContacts } from "../util/api";
import { AddContact } from "./AddContact";

export const AllContacts = () => {
  const loaderData = useLoaderData();
  // console.log("load data from page");

  //console.log(loaderData);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export const loader = async () => {
  return defer({ contact: getAllContacts() });
};
