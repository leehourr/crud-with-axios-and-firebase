import React from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import { EditContact } from "../components/Contact/EditContact";
import { updateContact } from "../util/api";

export const EditContacts = () => {
  const param = useParams();
  const navigate = useNavigate();
 // console.log(param.name);
  const closeForm = () => {
    navigate(-1);
  };
  return (
    <EditContact
      onClose={closeForm}
      name={param.name}
      number={param.number}
      id={param.id}
    />
  );
};

export const action = async ({ params, request }) => {
  const data = await request.formData();

  const name = data.get("name");
  const number = data.get("number");
  const uid = params.id;
  //console.log(number);
  const contact = { name, number };
  await updateContact(uid, contact);

  return redirect("/");
};
