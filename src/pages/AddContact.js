import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { NewContact } from "../components/Contact/NewContact";
import { AddContact as addData } from "../util/api";

export const AddContact = ({ onClose }) => {
  const navigate = useNavigate();
  // console.log("state");
  // console.log(navigation.state);
  // if (navigation.state === "submitting") {
  //   setOpenForm(false);
  //   return;
  // }
  const closeForm = () => {
    // console.log("asda");
    navigate("/home");
  };

  return <NewContact onClose={closeForm} />;
};

export const action = async ({ request }) => {
  // const navigate = ;
  // const navigate = useNavigate();
  const data = await request.formData();
  //console.log(data.get("number"));
  const name = data.get("name");
  const number = data.get("number");
  const contact = { name, number };
  const newContact = await addData(contact);
  console.log(newContact);
  window.scrollTo({
    top: window.innerHeight + 1000,
    behavior: "smooth",
  });
  return redirect("/home");
};
