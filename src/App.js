import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AllContacts, loader as getAllContacts } from "./pages/AllContacts";
import { AddContact } from "./pages/AddContact";
import { EditContacts } from "./pages/EditContacts";
import { RootLayout } from "./pages/RootLayout";
import { PageNotFound } from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllContacts />,
        loader: getAllContacts,
      },
      {
        path: "/add",
        element: <AddContact />,
      },
      {
        path: "/edit/:id",
        element: <EditContacts />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
