import React from "react";
import { Dog } from "../components/Dog/Dog";
import github from "../assets/github.svg";

const DogModel = () => {
  return (
    <div className="bg-zinc-800 relative w-screen h-screen  text-white text-xl sm:text-3xl font-bold">
      <Dog />
      <div className="absolute w-full h-[44%] flex flex-col items-center justify-between px-4 top-[55%] left-[50%] -translate-x-[50%]  text-center">
        <div>
          <div>
            Simple <span className="text-cyan-500">contact app</span> (crud)
            built with <span className="text-cyan-500">react js</span>
          </div>
          <button className="bg-cyan-700 rounded-lg py-2 px-4 text-center self-center mt-4 hover:bg-cyan-900 active:bg-cyan-900 uppercase">
            Get started
          </button>
          <a
            className="cursor-pointer flex items-center justify-center mt-2 text-lg font-semibold hover:underline hover:underline-offset-2 active:underline active:underline-offset-2"
            href="https://github.com/leehourr/crud-with-axios-and-firebase"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="inline-block w-6 h-6 mr-1"
              src={github}
              alt="Github"
            />
            <span>Source</span>
          </a>
        </div>
        <footer className="text-[0.9rem] sm:text-[1rem]">© 2022 Leang Lyhour</footer>
      </div>
    </div>
  );
};

export default DogModel;
