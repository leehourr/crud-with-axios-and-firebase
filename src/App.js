import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AllContacts, loader as getAllContacts } from "./pages/AllContacts";
import { AddContact, action as addContact } from "./pages/AddContact";
import { EditContacts, action as updateContact } from "./pages/EditContacts";
import { action as deleteContact } from "./pages/removeContact";
// import { RootLayout } from "./pages/RootLayout";
import { PageNotFound } from "./pages/PageNotFound";
import DogModel from "./pages/DogModel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DogModel />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <AllContacts />,
    loader: getAllContacts,
    children: [
      {
        path: "add-contact",
        element: <AddContact />,
        action: addContact,
      },
      {
        path: "edit/:id&:name&:number",
        element: <EditContacts />,
        action: updateContact,
        children: [],
      },
      {
        path: "remove/:id",
        action: deleteContact,
      },
    ],
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
