import React, { useEffect, useRef, useState } from "react";
import SongSelector from "./SongSelector";
import SlidernAudio from "./SlidernAudio";
import ControlButtons from "./ControlButtons";

function SongContent({ loadedSongs, setloadedSongs, loadCustomSongs }) {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  //selected song through modal
  const [rangeValue, setRangeValue] = useState(0);
  //for shuffle and loop
  const [isLooping, setisLooping] = useState(false);
  const [isShuffle, setisShuffle] = useState(false);

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
    audioElement.current.currentTime = e.target.value;
  };

  const handleTimeUpdate = () => {
    let currentTime = audioElement.current.currentTime;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    setcurrentTime(`${currentMin}:${currentSec}`);
    setRangeValue(audioElement.current.currentTime);
    //  console.log(`Progress: ${progress}%`);
  };

  // runs every second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let currentTime = audioElement.current.currentTime;
  //     let currentMin = Math.floor(currentTime / 60);
  //     let currentSec = Math.floor(currentTime % 60);
  //     if (currentSec < 10) {
  //       //if sec is less than 10 then add 0 before it
  //       currentSec = `0${currentSec}`;
  //     }
  //     setcurrentTime(`${currentMin}:${currentSec}`);
  //     setRangeValue(audioElement.current.currentTime);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }

    let mainAdDuration = audioElement.current.duration;
    setmaxSliderValue(mainAdDuration);
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    setSongDuration(
      `${isNaN(totalMin) ? "0" : totalMin}:${isNaN(totalSec) ? "00" : totalSec}`
    );
  });

  // control button functions
  const randomNumber = () => {
    let x = Math.floor(Math.random() * loadedSongs.length - 1) + 1;
    return x;
  };

  const nextSong = () => {
    if (isShuffle) {
      let newIndex = randomNumber();
      if (newIndex === currentIndex) {
        newIndex = randomNumber();
      }
      // console.log(newIndex);
      setcurrentIndex(newIndex === currentIndex ? randomNumber() : newIndex);
      return;
    } else if (currentIndex > loadedSongs.length - 2) {
      setcurrentIndex(0);
    } else {
      setcurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    }
    console.log(loadedSongs.length - 1);
  };
  const prevSong = () => {
    if (currentIndex <= 0) {
      setcurrentIndex(loadedSongs.length - 1);
    } else {
      setcurrentIndex(currentIndex - 1);
      console.log(currentIndex);
    }
  };

  return (
    <div className=" lg:px-80">
      {/* Image cover  imageUrl */}
      <div className="bg-white w-[75%] h-80 lg:w-48 lg:h-48 m-auto mt-10 rounded-2xl shadow-2xl">
        <img
          src={loadedSongs[currentIndex].imageUrl}
          className="h-full w-full object-cover rounded-2xl shadow-3xl"
          alt=""
        />
      </div>
      {/* Image cover end */}
      {/* <button onClick={metadata}>Meta demo</button> */}

      <div className="text-center mt-10  text-colorlg">
        <h2 className="text-3xl leading-10 font-bold">
          {loadedSongs[currentIndex].fileTitle.replace(
            /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi,
            function (x) {
              return " ";
            }
          )}
        </h2>
        <h4 className="text-xl leading-10 font-semibold">
          {/* slice(0, 20) */}
          {loadedSongs[currentIndex].fileArtist.replace(
            /blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi,
            function (x) {
              return " ";
            }
          )}
        </h4>
      </div>
      {/* Song details  */}

      {/* Silder  */}
      <SlidernAudio
        loadedSongs={loadedSongs}
        currentIndex={currentIndex}
        audioElement={audioElement}
        handleTimeUpdate={handleTimeUpdate}
        currentTime={currentTime}
        sliderChange={sliderChange}
        rangeValue={rangeValue}
        maxSliderValue={maxSliderValue}
        songDuration={songDuration}
        setcurrentIndex={setcurrentIndex}
        randomNumber={randomNumber}
        isLooping={isLooping}
        isShuffle={isShuffle}
      />
      {/* Silder  */}

      {/* control buttons  */}
      <ControlButtons
        nextSong={nextSong}
        prevSong={prevSong}
        currentIndex={currentIndex}
        loadedSongs={loadedSongs}
        setcurrentIndex={setcurrentIndex}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        isLooping={isLooping}
        isShuffle={isShuffle}
        setisLooping={setisLooping}
        setisShuffle={setisShuffle}
      />
      {/* control buttons end */}

      {/* song selection  */}
      <SongSelector
        loadCustomSongs={loadCustomSongs}
        setopenCloseModal={setopenCloseModal}
        openCloseModal={openCloseModal}
        loadedSongs={loadedSongs}
        currentIndex={currentIndex}
        setcurrentIndex={setcurrentIndex}
      />
      {/* song selection end */}
    </div>
  );
}

export default SongContent;
