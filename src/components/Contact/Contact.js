import React, { Fragment, useState, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EditContact } from "./EditContact";
import { Card } from "../Ui/Card";
import edit from "../../assets/edit.svg";

export const Contact = memo(({ id, name, number, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const updateHandler = (e) => {
    // e.preventDefault();
    let uName = name;
    // console.log(uName.trim());
    navigate(`/edit/${id}&${name}&${number}`);
  };

  return (
    <Fragment>
      <li>
        <Card className=" text-center">
          <div className="py-5 px-1 flex flex-row ">
            <div className="text-left">
              <h2 className="font-bold text-green-400 uppercase ">{name}</h2>
              <span>{number}</span>
            </div>
            <button
              onClick={updateHandler}
              className=" h-13 w-12 mr-2 nm-flat-zinc-800 hover:nm-inset-zinc-800 active:nm-inset-zinc-800 cursor-pointer  ml-auto  rounded-md"
            >
              <img src={edit} alt="edit" />
            </button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
});
