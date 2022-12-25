import React from "react";
import {
  BsArrowRepeat,
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
} from "react-icons/bs";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
function ControlButtons({
  currentIndex,
  loadedSongs,
  setcurrentIndex,
  isPlaying,
  togglePlay,
  isLooping,
  isShuffle,
  setisLooping,
  setisShuffle,
  nextSong,
  prevSong,
  darkMode,
}) {
  return (
    <div className="absolute w-full bottom-28 lg:w-72 lg:bottom-0 xl:right-80 lg:right-44">
      <div className="flex justify-between items-center text-5xl p-2 px-6  text-colorctr">
        <BsArrowRepeat
          className={`text-4xl ${isLooping ? darkMode?"text-colormd":" text-colorlgdk" : ""}`}
          onClick={() => {
            isShuffle && setisShuffle(false);
            setisLooping(!isLooping);
          }}
        />
        <BiSkipPrevious
          onClick={prevSong}
        />
        {isPlaying ? (
          <BsPauseFill className="text-6xl" onClick={togglePlay} />
        ) : (
          <BsFillPlayFill className="text-6xl" onClick={togglePlay} />
        )}
        <BiSkipNext
          onClick={nextSong}
        />
        <BsShuffle
          className={`text-4xl ${isShuffle ?  darkMode?"text-colormd":" text-colorlgdk" : ""}`}
          onClick={() => {
            isLooping && setisLooping(false);
            setisShuffle(!isShuffle);
            //  console.log("first")
          }}
        />
      </div>
    </div>
  );
}

export default ControlButtons;
