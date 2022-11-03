import React from "react";
import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { NewContact } from "../components/Contact/NewContact";
import { AddContact as addData } from "../util/api";

export const AddContact = () => {
  return <NewContact />;
};

export const action = async ({ request }) => {
  const data = await request.formData();
  console.log(data.get("number"));
  const name = data.get("name");
  const number = data.get("number");
  const contact = { name, number };
  await addData(contact);
  return redirect("/");
};
