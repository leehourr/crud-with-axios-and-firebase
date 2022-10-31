import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import AllContact from "./pages/AllContacts";
// import AddContact from "./pages/AddContact";
// import ContactDetails from "./pages/ContactDetails";
// import EditContact from "./pages/EditContact";
import { MainNav } from "./components/Ui/MainNav";
//import { Contact } from "./components/Contact/Contact";
import { ContactList } from "./components/Contact/ContactList";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/contact",
//         element: <AllContact />,
//         children: [
//           {
//             path: ":id",
//             element: <ContactDetai />,
//             loader: blogPostLoader,
//           },
//         ],
//       },
//       {
//         path: "/contact/new",
//         element: <AddContact />,
//         action: newPostAction,
//       },
//       {
//         path: "/contact/edit",
//         element: <EditContact />,
//         action: newPostAction,
//       },
//     ],
//   },
// ]);

function App() {
  //return <RouterProvider router={router} />;
  return (
    <div className="min-h-screen flex items-center align-text-top flex-col bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-fit space-y-8 p-0" >
        <h2 className="mt-6 mb-10 text-center text-3xl font-extrabold text-cyan-400 cursor-pointer">
          CONTACT
        </h2>
      </div>
      {/* <MainNav /> */}
      <ContactList  />
    </div>
  );
}

export default App;
