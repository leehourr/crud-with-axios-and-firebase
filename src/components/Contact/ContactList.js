import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Contact } from "./Contact";
import { NewContact } from "../Contact/NewContact";
import { Card } from "../Ui/Card";
import {
  getAllContacts,
  removeContact,
  updateContact,
} from "../../util/api";

export const ContactList = ({ contact }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [isInvalid, setIsinvalid] = useState();

  useEffect(() => {
    const temp = [];
    for (const key in contact) {
      temp.push({
        id: key,
        name: contact[key].name,
        number: contact[key].number,
      });
    }

    setContacts(temp);
  }, [contact]);


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
          //onDelete={removeHandler}
         // onEdit={editHandler.bind(null, data.id)}
        />
      );
    });
  }

  return (
    <Fragment>
      {/* {isInvalid && "asda"} */}
      <Card className="text-white nm-flat-gray-800 max-w-lg w-full p-4 rounded-lg mt-6 ">
        <ul className="divide-y divide-slate-700">{content}</ul>
      </Card>
    </Fragment>
  );
};
