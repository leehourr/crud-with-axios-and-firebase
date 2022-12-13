import React, { Fragment, Suspense, useEffect, useState } from "react";
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
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const loaderData = useLoaderData();
  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setContacts(loaderData);
  }, [loaderData]);

  const addFormHandler = () => {
   // console.log("form opened");
    navigate("/add-contact");
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const input = e.target.value;
 //   console.log(input);
    setSearch(input);
    //console.log(uName[0]);
    const data = await getAllContacts();
    //   console.log("search");

    //   console.log(data);
    const contact = [];
    for (const key in data) {
      contact.push({
        id: key,
        name: data[key].name,
        number: data[key].number,
      });
    }
    //  console.log(contact);
    setContacts(contact);
    //
    const search_contact = [];
    // const contact = data.map((n) => {
    //   return { id: n.id, name: n.name, number: n.number };
    // });

    for (let i = 0; i < contact.length; i++) {
      const c_name = contact[i].name.toLowerCase();
      const u_input = input.toLowerCase();
      if (c_name.includes(u_input.trim()) && u_input !== "") {
        search_contact.push(contact[i]);
     //   console.log(search_contact);
      }
    }
    if (input !== "" && search_contact) {
      setContacts(search_contact);
    }
    // console.log("match");

    // console.log(contact);
  };
  // console.log("load data from page");

  //console.log(loaderData);
  return (
    <div className="min-h-screen flex items-center align-text-top flex-col bg-zinc-800 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-all duration-75 ">
      <div className="max-w-fit space-y-8 p-0">
        <h2 className=" mb-6 sm:mb-10 text-center text-3xl font-extrabold text-cyan-400 cursor-pointer">
          CONTACT 
        </h2>
      </div>
      <div className="flex max-w-lg w-full flex-row space-x-14">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={searchHandler}
          className="w-full outline-none nm-inset-zinc-800 text-black placeholder-grey-400 text-sm sm:text-lg rounded-lg block p-1.5 px-6 caret-cyan-500 border-b-[1px] border-b-transparent focus:border-b-cyan-600 focus:border-cyan-200"
          placeholder="Search name" 
        />
        <div className="text-cyan-200 border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 p-0.5 px-2 text-lg nm-flat-zinc-800 transition ease-in-out delay-150 duration-1000">
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
          {(loaderData) => (
            <ContactList contact={loaderData} searchContact={contacts} />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export const loader = async () => {
  return defer({ contact: getAllContacts() });
};
