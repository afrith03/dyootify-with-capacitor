import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  BsArrowRepeat,
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
} from "react-icons/bs";
import { BiSkipPrevious, BiSkipNext, BiUpArrowAlt } from "react-icons/bi";
function SongContent({loadedSongs, setloadedSongs}) {
 
  const [currentIndex, setcurrentIndex] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  //selected song through modal
  const [rangeValue, setRangeValue] = useState(0);

  // ref for the audio element
  const audioElement = useRef(null);
  const [currentTime, setcurrentTime] = useState(null);
  const [songDuration, setSongDuration] = useState(null);
  const [maxSliderValue, setmaxSliderValue] = useState(100);
  const [openCloseModal, setopenCloseModal] = useState(false);
  const togglePlay = () => {
    setisPlaying(!isPlaying);
  };
  const sliderChange = (e) => {
    setRangeValue(e.target.value);
    console.log(rangeValue);

    audioElement.current.currentTime = rangeValue;
  };
  // runs every second 
  useEffect(() => {
    const interval = setInterval(() => {
      let currentTime = audioElement.current.currentTime;
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if (currentSec < 10) {
        //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
      }
      setcurrentTime(`${currentMin}:${currentSec}`);
      setRangeValue(audioElement.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }

    let mainAdDuration = audioElement.current.duration;
    setmaxSliderValue(mainAdDuration)
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    setSongDuration(`${totalMin}:${totalSec}`);
  });
  return (
    <>
      {/* Image cover  */}
      <div className="bg-white w-80 h-80 m-auto mt-10 rounded-2xl shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1671180895327-e5a3eee7bae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="h-full w-full object-cover rounded-2xl shadow-2xl"
          alt=""
        />
      </div>
      {/* Image cover end */}

      <div className="text-center mt-10 ">
        <h2 className="text-3xl leading-10 font-bold">
          {loadedSongs[currentIndex].fileAlbum}
        </h2>
        <h4 className="text-xl leading-10 font-semibold">
          {loadedSongs[currentIndex].fileArtist}
        </h4>
      </div>
      {/* Song details  */}

      {/* Silder  */}
      <audio
        src={loadedSongs[currentIndex].driveLink}
        ref={audioElement}
      ></audio>

      <div className="flex justify-between items-center p-2 mt-8">
        <p> {currentTime == null ? "00:00" : currentTime}</p>
        <input
          type="range"
          onDragEnd={sliderChange}
          onChange={sliderChange}
          value={rangeValue}
          min={0}
          max={maxSliderValue==NaN ||undefined?100:maxSliderValue}
          className="w-full m-2"
        />
        <p> {songDuration ?  songDuration :"00:00"}</p>
      </div>
      {/* Silder  */}

      {/* control buttons  */}
      <div className="absolute w-full bottom-28">
        <div className="flex justify-between items-center text-5xl p-2 mt-7">
          <BsArrowRepeat className="text-4xl" />
          <BiSkipPrevious
            onClick={() => {
              if (currentIndex < loadedSongs.length-1) {
                setcurrentIndex(1);
              } else {
                setcurrentIndex(currentIndex - 1);
                console.log(currentIndex)
              }  
            }}
          />
          {isPlaying ? (
            <BsPauseFill className="text-6xl" onClick={togglePlay} />
          ) : (
            <BsFillPlayFill className="text-6xl" onClick={togglePlay} />
          )}
          <BiSkipNext
            onClick={() => {
              if (currentIndex > loadedSongs.length-2) {
                setcurrentIndex(0);
              } else {
                setcurrentIndex(currentIndex + 1);
                console.log(currentIndex)
              }
              console.log(loadedSongs.length-1)  
            }}
          />
          <BsShuffle className="text-4xl" />
        </div>
      </div>

      {/* control buttons end */}

      {/* song selection  */}
      <div className="absolute bottom-0 w-full bg-violet-400  p-4 m-0 rounded-lg">
        <div
          onClick={() => {
            setopenCloseModal(!openCloseModal);
          }}
          className="flex justify-between items-center"
        >
          <img
            className="w-8 h-8"
            src="https://images.unsplash.com/photo-1671180895327-e5a3eee7bae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div>
            <h3 className="text-xl font-bold">
              {loadedSongs[currentIndex].fileAlbum}
            </h3>
            <h4 className="text-lg font-semibold">
              {loadedSongs[currentIndex].fileArtist}
            </h4>
          </div>
          <BiUpArrowAlt />
        </div>
        <hr />
        {/* song scroll */}
        <div className={openCloseModal ? "block overflow-scroll h-96" : "hidden"}>
          {loadedSongs.map((song, index) => (
            <div
              key={index}
              onClick={() => {
                console.log(song);
                setcurrentIndex(index);
              }}
              className="flex justify-between bg-purple-600 items-center m-1 rounded-lg px-2 py-1"
            >
              <img
                className="w-8 h-8"
                src="https://images.unsplash.com/photo-1671180895327-e5a3eee7bae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
              />
              <div>
                <h3 className="text-xl font-bold">{song.fileAlbum}</h3>
                <h4 className="text-lg font-semibold">{song.fileArtist}</h4>
              </div>
              <BiUpArrowAlt />
            </div>
          ))}
        </div>
        {/* song scroll end */}
      </div>
      {/* song selection end */}
    </>
  );
}

export default SongContent;
