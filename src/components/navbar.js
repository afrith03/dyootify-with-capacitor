// import { click } from "@testing-library/user-event/dist/click";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsMusicNoteList } from "react-icons/bs";

function Navbar({ darkMode, setdarkMode }) {
  const [aboutus, setaboutus] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center w-full text-2xl p-3">
        <BsMusicNoteList
          className="text-colorctr"
          onChange={() => {
            setaboutus(!aboutus);
            // window.addEventListener("click", () => {
            //   setaboutus(false);
            // });
          }}
        />
        <a href="/app.apk" download={true}>
          <button
            class={`hidden lg:block px-4 py-2 ${
              darkMode ? "bg-colormd" : "bg-colorlgdk"
            }  text-white text-sm font-medium rounded-full`}
          >
            Download Andriod
          </button>
        </a>
        {/* <BsThreeDots/> */}
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => {
              setdarkMode(!darkMode);
              console.log(darkMode);
            }}
            checked={darkMode}
          />
          <span className="slider" />
        </label>
      </div>
      {/* about us modal  */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`absolute ${
          aboutus ? "visible" : "hidden"
        } bg-colorsmdk rounded-md w-80 h-auto`}
      >
        <div className="p-3">
          <h2 className="text-center font-bold">About Us</h2>
          <p>
            <b> Front-end:</b>{" "}
            <a
              className="text-colormddk"
              href="https://afrithshariff.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Afrith Shariff
            </a>
            <br />
            <b> Back-end: </b>
            <a
              className="text-colormddk"
              href="https://www.linkedin.com/in/shanawaz-sk-297549235/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shanawaz SK{" "}
            </a>
            <br />
            Tecnologies used to build this project -
            React.js,Node.js,Capacitor.js,Tailwindcss
            <br />
            special thanks to <a href="https://www.linkedin.com/in/arunprasad97/" target="_blank" rel="noopener noreferrer">Arun {"(panda)"}</a> 
            <br />
            <i>
              All Source-code availabe at Github <br />
              <a
                className="text-colormddk"
                target="_blank"
                href="https://github.com/afrith03/dyootify-with-capacitor"
                rel="noopener noreferrer"
              >
                front-end
              </a>{" "}
              &
              <a
                className="text-colormddk"
                href="https://github.com/shanawaz-Git/dyootify-server"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                back-end
              </a>
            </i>
          </p>
          <a href="/app.apk" download={true}>
          <button
            className={`m-1 px-4 py-2 ${
              darkMode ? "bg-colormd" : "bg-colorlgdk"
            }  text-white text-sm font-medium rounded-full`}
          >
            Download Andriod
          </button>
        </a>
        <br />
        <p>
          Note:- This app is for educational purpose only.
        </p>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
