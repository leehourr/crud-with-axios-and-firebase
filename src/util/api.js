import axios from "axios";

const api = axios.create({
  baseURL:
    "https://contact-80078-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const getAllContacts = async () => {
  const response = await api.get("/contacts.json").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

export const getContact = async (id) => {
  const response = await api.get("/contacts.json" + id).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

export const AddContact = async (contact) => {
  // validatInput(contact.name, contact.number);
  const response = await api.post("/contacts.json", contact).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

export const updateContact = async (id, contact) => {
  //console.log(id+ "id");
  const response = await api.put(`/contacts/${id}.json`, contact).catch((e) => {
    errorHandler(e);
  });

  return response.data;
};

export const removeContact = async (id) => {
  const response = await api.delete(`/contacts/${id}.json`).catch((e) => {
    errorHandler(e);
  });
  //   const newContactList = contacts.filter((contact) => {
  //     return contact.id !== id;
  //   });
  return response.data;
};

function errorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}
// export async function getSlowPosts() {
//   await sleep(2000);
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!response.ok) {
//     throw new Response("Failed to fetch posts.", { status: 500 });
//   }
//   return response.json();
// }
