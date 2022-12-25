import React from "react";
import {
  BsArrowRepeat,
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
} from "react-icons/bs";
import { BiSkipPrevious, BiSkipNext, BiUpArrowAlt } from "react-icons/bi";
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
}) {
  return (
    <div className="absolute w-full bottom-28 lg:w-64 lg:bottom-0 lg:right-80">
      <div className="flex justify-between items-center text-5xl p-2 px-4 mt-7 text-colorctr">
        <BsArrowRepeat
          className={`text-4xl ${isLooping ? "text-colormd" : ""}`}
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
          className={`text-4xl ${isShuffle ? "text-colormd" : ""}`}
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
