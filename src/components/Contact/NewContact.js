import React, { Fragment, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

import ReactDOM from "react-dom";
import { BackDrop } from "../Ui/Backdrop";
import { Card } from "../Ui/Card";

export const NewContact = ({ onClose }) => {
  const fetcher = useFetcher();

  const inputName = useRef();
  const inputNumber = useRef();

  useEffect(() => {
    inputName.current.focus();
  }, []);

  function sumbitHandler(event) {
    event.preventDefault();
    const name = inputName.current.value;
    const number = inputNumber.current.value;

    fetcher.submit(
      { name, number },
      { method: "post", action: "/home/add-contact" }
    );
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className="fixed w-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden bg-zinc-800 p-6 rounded-lg animate-in fade-in   duration-500">
          <div className="mx-autor">
            <button
              onClick={onClose}
              className="text-cyan-200 block ml-auto border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 px-3.5  nm-flat-zinc-800 "
            >
              x
            </button>
            <form
              className=" "
              onSubmit={sumbitHandler}
              // method="post"
              // action="/add-contact"
            >
              <h2 className="block font-bold text-green-400 dark:text-green-400">
                Add contact
              </h2>
              <input
                type="text"
                id="name"
                ref={inputName}
                name="name"
                required
                className="outline-none mb-6 mt-4 nm-inset-zinc-800 px-4 caret-cyan-500 border-b-[1px] border-b-transparent focus:border-b-cyan-600 text-white placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
                placeholder="Name"
              />
              <input
                type="text"
                id="number"
                name="number"
                ref={inputNumber}
                required
                className="outline-none nm-inset-zinc-800 px-4 caret-cyan-500 border-b-[1px] border-b-transparent focus:border-b-cyan-600 mb-6 text-white placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 "
                placeholder="Number"
              />
              <button
                type="Submit"
                className="text-cyan-200 block ml-auto  border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 p-0.5 px-2 nm-flat-zinc-800 transition ease-in-out delay-150 duration-1000"
              >
                Add
              </button>
            </form>
          </div>
        </Card>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
