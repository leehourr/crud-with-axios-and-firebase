import React, { Fragment, Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";

import { ContactList } from "../components/Contact/ContactList";
import { Card } from "../components/Ui/Card";
import { LoadingSpinner } from "../components/Ui/LoadingSpinner";
import { getAllContacts } from "../util/api";

export const AllContacts = () => {
  const loaderData = useLoaderData();
  console.log("load data from page");

  console.log(loaderData);
  return (
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
  );
};

export const loader = async () => {
  return defer({ contact: getAllContacts() });
};
