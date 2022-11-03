import React, { Fragment, useState } from "react";
import {
  Navigate,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { NewContact } from "../components/Contact/NewContact";
import { AddContact as addData } from "../util/api";

export const AddContact = ({ onClose }) => {
  //const navigation = useNavigation();
  // console.log("state");
  // console.log(navigation.state);
  // if (navigation.state === "submitting") {
  //   setOpenForm(false);
  //   return;
  // }

  return <NewContact />;
};

export const action = async ({ request }) => {
  // const navigate = ;
  // const navigate = useNavigate();
  const data = await request.formData();
  //console.log(data.get("number"));
  const name = data.get("name");
  const number = data.get("number");
  const contact = { name, number };
  await addData(contact);
  return redirect("/");
};
