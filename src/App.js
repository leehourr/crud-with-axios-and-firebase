import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AllContacts, loader as getAllContacts } from "./pages/AllContacts";
import { AddContact, action as addContact } from "./pages/AddContact";
import { EditContacts } from "./pages/EditContacts";
import { RootLayout } from "./pages/RootLayout";
import { PageNotFound } from "./pages/PageNotFound";
import { NewContact } from "./components/Contact/NewContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllContacts />,
    loader: getAllContacts,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "add-contact",
        element: <AddContact />,
        action: addContact,
      },
      {
        path: "edit/:id",
        element: <EditContacts />,
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
