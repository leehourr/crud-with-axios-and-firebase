import { redirect } from "react-router-dom";
import { removeContact } from "../util/api";

export const action = async ({ params }) => {
  console.log(params.id);
   await removeContact(params.id);
   return redirect("/");
};
