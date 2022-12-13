import React, { Fragment, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card } from "../Ui/Card";
import { BackDrop } from "../Ui/Backdrop";
import { Form } from "react-router-dom";

export const EditContact = ({ id, name, number, onClose }) => {
  // const navigate = useNavigate();
  const inputName = useRef();
  const inputNumber = useRef();
  // const input = [];
  // const uInput = input.concat(name, number);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  // const deleteContact = () => {
  //   //useFormAction(`/edit/${id}/remove`);
  // };

  //   let slide_in_out = "";

  //   const style = ` `;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className="fixed w-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden bg-zinc-800 p-6 rounded-lg animate-in fade-in   duration-500">
          <div className="mx-autor">
            <div className="">
              <button
                onClick={onClose}
                className="text-cyan-200 block ml-auto border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 px-3.5  nm-flat-zinc-800"
              >
                x
              </button>
            </div>
            <Form method="post" action={`/edit/${id}&${name}&${number}`}>
              <h2 className="block font-bold text-green-400 dark:text-green-400 ">
                Edit contact
              </h2>
              <input
                type="text"
                id="name"
                name="name"
                ref={inputName}
                defaultValue={name}
                className="outline-none nm-inset-zinc-800 px-4 caret-cyan-500 border-b-[1px] border-b-transparent focus:border-b-cyan-600 mb-6 mt-4 text-white placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 focus:border-cyan-200"
                placeholder="Name"
              />
              <input
                type="text"
                id="number"
                name="number"
                ref={inputNumber}
                defaultValue={number}
                className="outline-none nm-inset-zinc-800 px-4 caret-cyan-500 border-b-[1px] border-b-transparent focus:border-b-cyan-600 mb-6 text-white placeholder-grey-400 text-sm rounded-lg block w-full p-1.5 "
                placeholder="Password"
              />
              <button
                type="submit"
                className="text-cyan-200 w-full mx-auto border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 px-2 nm-flat-zinc-800 transition ease-in-out delay-150 duration-1000"
                //  onClick=}
              >
                Edit
              </button>
              <button
                className="text-red-400 nm-flat-zinc-800 w-full mt-3.5 mx-auto border-solid rounded-lg border-transparent  hover:nm-inset-zinc-800 px-2 transition ease-in-out delay-150 duration-1000"
                //  onClick={deleteContact}
                formAction={`/remove/${id}`}
              >
                Delete
              </button>
            </Form>
          </div>
        </Card>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
