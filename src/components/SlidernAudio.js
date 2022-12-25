import React, { useEffect } from "react";

function SlidernAudio({
  loadedSongs,
  currentIndex,
  audioElement,
  handleTimeUpdate,
  currentTime,
  sliderChange,
  rangeValue,
  maxSliderValue,
  songDuration,
  setcurrentIndex,
  randomNumber,
  isLooping,
  isShuffle,
}) {
  const handleSongEnded = () => {
    if (isShuffle) {
      let newIndex = randomNumber();
      if (newIndex === currentIndex) {
        newIndex = randomNumber();
      }
      // console.log(newIndex);
      setcurrentIndex(newIndex === currentIndex ? randomNumber() : newIndex);
      return;
    } else if (isLooping) {
      setcurrentIndex(currentIndex);
      return;
    } else if (currentIndex > loadedSongs.length - 2) {
      setcurrentIndex(0);
    } else {
      setcurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    }
    console.log(loadedSongs.length - 1);
  };

  useEffect(() => {
    audioElement.current.addEventListener("ended", handleSongEnded);
    // return () => {
    //  audioElement.current.removeEventListener("ended", handleSongEnded);
    // };
  }, []);

  return (
    <>
      <audio
        src={loadedSongs[currentIndex].driveLink}
        ref={audioElement}
        onTimeUpdate={handleTimeUpdate}
      ></audio>

      <div className="flex justify-between items-center p-2 mt-[5vh] text-colorctr">
        <p> {currentTime == null ? "00:00" : currentTime}</p>
        <input
          type="range"
          //  onDragEnd={sliderChange}
          //  onClick={sliderChange}
          //   onChange={sliderChange}
          onInput={sliderChange}
          value={rangeValue}
          min={0}
          max={isNaN(maxSliderValue) || undefined ? 100 : maxSliderValue}
          className="w-full m-2 h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          disabled={isNaN(maxSliderValue) || undefined}
        />
        <p> {songDuration ? songDuration : "00:00"}</p>
      </div>
    </>
  );
}

export default SlidernAudio;
