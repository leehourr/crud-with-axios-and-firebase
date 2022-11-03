import React, { Fragment, useState } from "react";
import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { NewContact } from "../components/Contact/NewContact";
import { AddContact as addData } from "../util/api";

export const AddContact = ({ onClose }) => {
  const [openForm, setOpenForm] = useState(false);
   
  const navigate = useNavigate();

  const addFormHandler = () => {
    console.log("form opened");
    setOpenForm((prev) => !prev);
    navigate("/add-contact");
  };

  const navigation = useNavigation();
  console.log("state");
  console.log(navigation.state);
  if (navigation.state === "submitting") {
    setOpenForm(false);
    return;
  }

  return (
    <Fragment>
      <div className="flex flex-row space-x-14">
        <input
          type="text"
          id="search"
          name="search"
          //  value={search}
          //    onChange={searchHandler}
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
        {openForm && <NewContact onClose={addFormHandler} />}
      </div>
    </Fragment>
  );
};

export const action = async ({ request }) => {
  const data = await request.formData();
  //console.log(data.get("number"));
  const name = data.get("name");
  const number = data.get("number");
  const contact = { name, number };
  await addData(contact);
  return redirect("/");
};
