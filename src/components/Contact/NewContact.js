import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BackDrop } from "../Ui/Backdrop";
import { Card } from "../Ui/Card";

export const NewContact = ({ onSubmit, onClose }) => {
  const inputName = useRef();
  const inputNumber = useRef();

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const addContactHandler = (e) => {
    e.preventDefault();

    const name = inputName.current.value;
    const number = inputNumber.current.value;
    // console.log(inputName, number);
    onSubmit(name, number);
    inputName.current.value = "";
    inputNumber.current.value = "";
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card
          className={
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden    bg-gray-800 p-6 rounded-lg"
          }
        >
          <button
            onClick={onClose}
            className="text-cyan-200 ml-36 border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 px-3.5  nm-flat-gray-800 "
          >
            x
          </button>
          <form className=" " onSubmit={addContactHandler}>
            <h2 className="block font-bold text-green-400 dark:text-green-400">
              Add contact
            </h2>
            <input
              type="text"
              id="name"
              ref={inputName}
              name="name"
              required
              className="border-cyan-200 mb-6 mt-4 text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
              placeholder="Name"
            />
            <input
              type="text"
              id="number"
              name="number"
              ref={inputNumber}
              required
              className="border-cyan-200 mb-6 text-black placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 dark:border-cyan-200"
              placeholder="Password"
            />
            <button
              type="Submit"
              className="text-cyan-200 text-right ml-36 border-solid rounded-lg border-transparent  hover:nm-inset-gray-800 p-0.5 nm-flat-gray-800 transition ease-in-out delay-150 duration-1000"
            >
              Add
            </button>
          </form>
        </Card>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
