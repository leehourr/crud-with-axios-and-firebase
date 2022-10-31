import React, { Fragment, useState } from "react";
import { EditContact } from "./EditContact";
import { Card } from "../Ui/Card";
import edit from "../../assets/edit.svg";

export const Contact = ({ id, name, number, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState();

  const updateHandler = (e) => {
    // e.preventDefault();
    setIsEdit(true);
  };

  const closeHandler = () => {
    setIsEdit(null);
  };

  return (
    <Fragment>
      {isEdit && (
        <EditContact
          onClose={closeHandler}
          // closeForm={closeHandler}
          onDelete={onDelete.bind(null, id)}
          onEdit={onEdit}
          name={name}
          number={number}
        />
      )}
      <li>
        <Card className=" text-center">
          <div className="py-5 px-1 flex flex-row ">
            <div className="text-left">
              <h2 className="font-bold text-green-400 uppercase ">{name}</h2>
              <span>{number}</span>
            </div>
            <button
              onClick={updateHandler}
              className=" h-13 w-12 mr-2 nm-flat-gray-800 hover:nm-inset-gray-800 active:nm-inset-gray-800 cursor-pointer  ml-auto  rounded-md"
            >
              <img src={edit} alt="edit" />
            </button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};
