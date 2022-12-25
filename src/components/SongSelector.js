import React from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";

function SongSelector({
  setopenCloseModal,
  openCloseModal,
  loadedSongs,
  currentIndex,
  setcurrentIndex,
  loadCustomSongs,
  darkMode,
}) {
  return (
    <div
      className={`absolute  ${darkMode ? "bg-colormd" : "bg-colormddk"} ${
        darkMode ? "text-colorsm" : "text-colorsmdk"
      } bottom-0 w-full bg-violet-400 p-4 m-0 rounded-t-xl xl:w-80 lg:w-72 lg:left-44 xl:left-80`}
    >
      <div
        onClick={() => {
          setopenCloseModal(!openCloseModal);
        }}
        className="flex justify-between items-center"
      >
        <img
          className="w-12 h-12 rounded-sm"
          src={loadedSongs[currentIndex].imageUrl}
          alt="list preview album"
        />
        <div>
          <h3 className="text-xl font-bold">
            {loadedSongs[currentIndex].fileTitle.replace(
              /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|\(PaglaSongs\)|:/gi,
              function (x) {
                return " ";
              }
            )}
          </h3>
          <h4 className="text-lg font-semibold">
            {loadedSongs[currentIndex].fileArtist
              .slice(0, 14)
              .replace(
                /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi,
                function (x) {
                  return " ";
                }
              )}
            ... | {loadedSongs[currentIndex].language}
          </h4>
        </div>
        {openCloseModal ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
      </div>
      {/* song scroll */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={
          openCloseModal
            ? "block overflow-y-scroll scroll-m-0 scroll-p-0 stroke-colorxl scrollbar-hide h-96 overflow-hidden"
            : "hidden"
        }
      >
        <div className="w-full overflow-x-scroll scrollbar-hide py-2">
          <div className="w-[200%]">
            <button
              name="all"
              class="px-4 py-2 bg-pillColor mx-2 text-white text-sm font-medium rounded-full"
              onClick={(e) => {
                loadCustomSongs(e);
              }}
            >
              All
            </button>
            <button
              name="tamil"
              class="px-4 py-2 bg-pillColor mx-2 text-white text-sm font-medium rounded-full"
              onClick={(e) => {
                loadCustomSongs(e);
              }}
            >
              Tamil
            </button>
            <button
              name="english"
              class="px-4 py-2 bg-pillColor mx-2 text-white text-sm font-medium rounded-full"
              onClick={(e) => {
                loadCustomSongs(e);
              }}
            >
              English
            </button>
            <button
              name="telugu"
              class="px-4 py-2 bg-pillColor mx-2 text-white text-sm font-medium rounded-full"
              onClick={(e) => {
                loadCustomSongs(e);
              }}
            >
              Telugu
            </button>
            <button
              name="hindi"
              class="px-4 py-2 bg-pillColor mx-2 text-white text-sm font-medium rounded-full"
              onClick={(e) => {
                loadCustomSongs(e);
              }}
            >
              Hindi
            </button>
          </div>
        </div>
        {loadedSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => {
              console.log(song);
              setcurrentIndex(index);
            }}
            className={`flex justify-between ${
              darkMode ? "bg-colormd" : "bg-colormddk"
            } shadow-lg items-center m-1 rounded-lg px-2 py-1`}
          >
            <div className="">
              <h3 className="text-xl font-bold text-left">
                {song.fileTitle.replace(
                  /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|\(PaglaSongs\)|:/gi,
                  function (x) {
                    return " ";
                  }
                )}
              </h3>
              <h4 className="text-lg font-semibold">
                {song.fileArtist.slice(0, 18) +
                  "...".replace(
                    /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|\(PaglaSongs\)|:/gi,
                    function (x) {
                      return " ";
                    }
                  )}
              </h4>
            </div>
            <img
              className="w-12 h-12 rounded-md"
              // src="https://images.unsplash.com/photo-1671180895327-e5a3eee7bae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              src={song.imageUrl}
              alt="list preview album"
            />
          </div>
        ))}
      </motion.div>
      {/* song scroll end */}
    </div>
  );
}

export default SongSelector;
