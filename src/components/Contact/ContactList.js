import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Contact } from "./Contact";
import { NewContact } from "../Contact/NewContact";
import { Card } from "../Ui/Card";

export const ContactList = ({ contact, searchContact }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

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
      if (Array.isArray(searchContact)) {
        setContacts(searchContact);
      }
  //  console.log("in contactlist");
  // console.log(Array.isArray(searchContact));
  }, [contact, searchContact]);

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
      <Card className="text-white nm-flat-zinc-800 max-w-lg w-full p-4 rounded-lg mt-6 ">
        <ul className="divide-y divide-cyan-300">{content}</ul>
      </Card>
    </Fragment>
  );
};
