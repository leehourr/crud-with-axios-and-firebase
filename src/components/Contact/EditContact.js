import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card } from "../Ui/Card";
import { BackDrop } from "../Ui/Backdrop";
import { useNavigate } from "react-router-dom";

export const EditContact = ({
  name,
  number,
  onClose,
  onDelete,
  onEdit,
  closeForm,
}) => {
  const inputName = useRef();
  const inputNumber = useRef();
  const [isOpen, setIsOpen] = useState(true);
  // const input = [];
  // const uInput = input.concat(name, number);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const editContactHandler = (e) => {
    e.preventDefault();
    const uName = inputName.current.value;
    const uNumber = inputNumber.current.value;
    let input_name = "";
    let input_number = "";
    uName !== "" ? (input_name = uName) : (input_name = name);
    uNumber !== "" ? (input_number = uNumber) : (input_number = number);
    console.log(input_name, input_number);
    onEdit({ input_name, input_number });
    onClose();
  };

  //   let slide_in_out = "";

  //   const style = ` `;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden bg-gray-800 p-6 rounded-lg animate-in fade-in   duration-500">
          <div className="mx-autor">
            <div className="">
              <button
                onClick={onClose}
                className="text-cyan-200 ml-36 border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 px-3.5  nm-flat-gray-800"
              >
                x
              </button>
            </div>
            <form onSubmit={editContactHandler}>
              <h2 className="block font-bold text-green-400 dark:text-green-400 ">
                Edit contact
              </h2>
              <input
                type="text"
                id="name"
                name="name"
                ref={inputName}
                defaultValue={name}
                className="border-cyan-200 mb-6 mt-4 text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
                placeholder="Name"
              />
              <input
                type="text"
                id="password"
                name="password"
                ref={inputNumber}
                defaultValue={number}
                className="border-cyan-200 mb-6 text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 dark:border-cyan-200"
                placeholder="Password"
              />
              <button
                type="submit"
                className="text-cyan-200 w-full mx-auto border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 px-2 nm-flat-gray-800 transition ease-in-out delay-150 duration-1000"
                //  onClick=}
              >
                Edit
              </button>
            </form>
            <button
              className="text-cyan-200 bg-red-400 w-full mt-3.5 mx-auto border-solid rounded-lg border-transparent  hover:nm-inset-red-900 px-2 nm-flat-red-900 transition ease-in-out delay-150 duration-1000"
              onClick={onDelete}
            >
              delete
            </button>
          </div>
        </Card>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
