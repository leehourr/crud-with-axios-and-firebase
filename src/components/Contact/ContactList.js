import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Contact } from "./Contact";
import { NewContact } from "../Contact/NewContact";
import { Card } from "../Ui/Card";
import {
  getContact,
  getAllContacts,
  AddContact,
  removeContact,
  updateContact,
} from "../../util/api";

export const ContactList = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [isInvalid, setIsinvalid] = useState();

  const getContacts = useCallback(async () => {
    setIsLoading(true);
    const data = await getAllContacts();
    //console.log(data);
    const contact = [];
    for (const key in data) {
      contact.push({
        id: key,
        name: data[key].name,
        number: data[key].number,
      });
    }
    // console.log(contact);
    setContacts(contact);
    // console.log(contact);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getContacts();
  }, [getContacts]);
  const addFormHandler = () => {
    setOpenForm((prev) => !prev);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const input = e.target.value;
    // console.log(input);
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
        //  console.log(search_contact);
      }
    }
    if (input !== "" && search_contact) {
      setContacts(search_contact);
    }

    //console.log(contact);
  };

  const addContactHandler = async (name, number) => {
    console.log(name, number);

    const input = {
      name,
      number,
    };
    const addedData = await AddContact(input);
    //  console.log("ADDED dad");
    // console.log(addedData.name);
    input.id = addedData.name;
    //   console.log(input);
    //const data = [];

    setContacts((prev) => {
      return [input, ...prev];
    });
    setOpenForm(false);
  };

  const removeHandler = async (id) => {
    const removedData = await removeContact(id);
    // console.log(removedData);
    //  console.log(id);
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== id);
    });
  };

  const editHandler = async (id, updated) => {
    const name = updated.input_name;
    const number = updated.input_number;
    const update = { name, number };
    const isValid = validateInput(name, number);
    if (!isValid) {
      // setIsinvalid(true);
      return;
    }
    // console.log(update);
    const response = await updateContact(id, update);
    // console.log("updated");
    // console.log(response);

    const updatedData = contacts.map((data) => {
      return data.id === id ? { id, ...response } : data;
    });
    setContacts(updatedData);
  };
  let content;

  if (contacts.length > 0 && contacts !== []) {
    content = contacts.map((data) => {
      // console.log(data.id);
      return (
        <Contact
          key={data.id}
          id={data.id}
          name={data.name}
          number={data.number}
          onDelete={removeHandler}
          onEdit={editHandler.bind(null, data.id)}
        />
      );
    });
  }

  const validateInput = (name, number) => {
    if (
      name.trim().length < 1 ||
      number.trim().length < 7 ||
      name === "" ||
      number === ""
    ) {
      // setIsinvalid(true);
      return false;
    }
    return true;
  };
  // if (error) {
  //   content = <p>{error}</p>;
  // }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <Fragment>
      {/* {isInvalid && "asda"} */}
      <div className="flex flex-row space-x-14">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={searchHandler}
          className="border-cyan-200  text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
          placeholder="Search name"
        />
        <div className="text-cyan-200 border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 p-0.5 nm-flat-gray-800 transition ease-in-out delay-150 duration-1000">
          <button onClick={addFormHandler} className="w-8">
            +
          </button>
        </div>
      </div>

      <div className="">
        {openForm && (
          <NewContact onSubmit={addContactHandler} onClose={addFormHandler} />
        )}
      </div>
      <Card className="text-white nm-flat-gray-800 max-w-lg w-full p-4 rounded-lg mt-6 ">
        <ul className="divide-y divide-slate-700">{content}</ul>
      </Card>
    </Fragment>
  );
};
