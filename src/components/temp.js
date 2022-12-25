/*
Design Credits : https://dribbble.com/shots/6437042-Music-App-UI
Also I couldn't find any open music API
so credits to 
https://codepen.io/JavaScriptJunkie/details/qBWrRyg
to make his repo public and make the songs easily accesible
also I used his UI as inspiration too
*/

import * as React from "https://cdn.skypack.dev/react";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { Transition } from "https://cdn.skypack.dev/react-transition-group@4.4.1";
import {
  ThreeDots,
  ChevronLeft,
  PauseFill,
  PlayFill,
  SkipBackwardFill,
  SkipForwardFill,
  Shuffle,
  ArrowRepeat,
  Heart,
  BoxArrowUpRight,
  HeartFill,
} from "https://cdn.skypack.dev/react-bootstrap-icons@1.5.0";

const tracks = [
  {
    name: "Mekanın Sahibi",
    artist: "Norm Ender",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
    favorited: false,
  },
  {
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
    favorited: true,
  },
  {
    name: "Extreme Ways",
    artist: "Moby",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Butterflies",
    artist: "Sia",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
    favorited: false,
  },
  {
    name: "The Final Victory",
    artist: "Haggard",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
    favorited: true,
  },
  {
    name: "Genius ft. Sia, Diplo, Labrinth",
    artist: "LSD",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
    favorited: false,
  },
  {
    name: "The Comeback Kid",
    artist: "Lindi Ortega",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
    url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
    favorited: true,
  },
  {
    name: "Overdose",
    artist: "Grandson",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
    url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
    favorited: false,
  },
  {
    name: "Rag'n'Bone Man",
    artist: "Human",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
    url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
    favorited: false,
  },
];
const player = new Audio(tracks[0].source);
player.setAttribute("preload", "metadata");
const userOptions = React.createContext({
  shuffle: false,
  repeat: false,
});

function Options(props) {
  let options = React.useContext(userOptions);
  let [shuffl, setShuffle] = React.useState(options.shuffle);
  let [repet, setRepeat] = React.useState(options.repeat);
  let [fav, setFav] = React.useState(tracks[props.idx].favorited);

  React.useEffect(() => setFav(tracks[props.idx].favorited));

  function shuffle() {
    options.shuffle = !options.shuffle;
    options.repeat = false;
    setShuffle(!shuffl);
    setRepeat(false);
  }

  function repeat() {
    options.repeat = !options.repeat;
    options.shuffle = false;
    setShuffle(false);
    setRepeat(!repet);
  }

  function favorite() {
    tracks[props.idx].favorited = !tracks[props.idx].favorited;
    setFav(tracks[props.idx].favorited);
  }

  function openURL() {
    window.open(tracks[props.idx].url, "_blank");
  }

  return (
    <div className="options">
      {(shuffl && (
        <button onClick={shuffle} className="opt" style={{ color: "#147CC0" }}>
          <Shuffle />
        </button>
      )) || (
        <button onClick={shuffle} className="opt">
          <Shuffle />
        </button>
      )}
      <button className="opt" onClick={openURL}>
        <BoxArrowUpRight />
      </button>
      {(fav && (
        <button onClick={favorite} className="opt" style={{ color: "#147CC0" }}>
          <HeartFill />
        </button>
      )) || (
        <button onClick={favorite} className="opt">
          <Heart />
        </button>
      )}
      {(repet && (
        <button onClick={repeat} className="opt" style={{ color: "#147CC0" }}>
          <ArrowRepeat />
        </button>
      )) || (
        <button onClick={repeat} className="opt">
          <ArrowRepeat />
        </button>
      )}
    </div>
  );
}

function Control(props) {
  return (
    <div className="controls">
      <button
        className="controlButton"
        onClick={(x) => props.setIdx(props.idx - 1 < 0 ? 8 : props.idx - 1)}
      >
        <SkipBackwardFill />
      </button>
      {props.playState === true ? (
        <button
          className="centerButton"
          onClick={(x) => props.setPlayState(false)}
        >
          <PauseFill />
        </button>
      ) : (
        <button
          className="centerButton"
          onClick={(x) => props.setPlayState(true)}
        >
          <PlayFill />
        </button>
      )}
      <button
        className="controlButton"
        onClick={(x) => props.setIdx((props.idx + 1) % 9)}
      >
        <SkipForwardFill />
      </button>
    </div>
  );
}

function Progress(props) {
  let [currLength, setCurrLength] = React.useState(0);
  let [length, setLength] = React.useState(0);
  let options = React.useContext(userOptions);
  const progressBar = document.querySelector(".progressBar");

  function updateProgress(e) {
    let offset = e.target.getBoundingClientRect().left;
    let newOffSet = e.clientX;
    let newWidth = newOffSet - offset;
    progressBar.style.width = newWidth + "px";
    let secPerPx = length / 280;
    player.currentTime = secPerPx * newWidth;
  }

  setInterval(() => {
    setLength(Math.ceil(player.duration));
    setCurrLength(Math.ceil(player.currentTime));
    let secPerPx = Math.ceil(player.duration) / 280;
    let newWidth = player.currentTime / secPerPx;
    document.querySelector(".progressBar").style.width = newWidth + "px";
    if (player.currentTime === player.duration) {
      if (options.shuffle === true) {
        props.setIdx(parseInt(Math.random() * 1000) % 9);
      } else if (options.repeat === true) {
        player.play();
      } else {
        props.setIdx((props.idx + 1) % 9);
      }
    }
  }, 1000);

  function formatTime(s) {
    return Number.isNaN(s)
      ? "0:00"
      : (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  return (
    <div className="progress">
      <div className="currentTime">
        <p>{formatTime(currLength)}</p>
      </div>
      <div className="progressCenter" onClick={(e) => updateProgress(e)}>
        <div className="progressBar"></div>
      </div>
      <div className="songLength">
        <p>{formatTime(length)}</p>
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <>
      <img src={tracks[props.idx].cover} className="avatar1" />
      <img src={tracks[props.idx].cover} className="avatar" />
      <h4 className="name">{tracks[props.idx].artist}</h4>
      <h1 className="title">{tracks[props.idx].name}</h1>
    </>
  );
}

function Container() {
  let [idx, setIdx] = React.useState(0);
  let [playState, setPlayState] = React.useState(false);
  let oldIdx = React.useRef(idx);
  React.useEffect(() => {
    if (playState === true) player.play();
    else player.pause();
    if (idx !== oldIdx.current) {
      player.pause();
      player.src = tracks[idx].source;
      player.load();
      player.play();
      setPlayState(true);
      oldIdx.current = idx;
    }
  });

  return (
    <div className="playerContaier">
      <Avatar idx={idx} />
      <Progress setIdx={setIdx} idx={idx} />
      <Control
        setIdx={setIdx}
        idx={idx}
        playState={playState}
        setPlayState={setPlayState}
      />
      <Options setIdx={setIdx} idx={idx} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <button className="icon">
        <ChevronLeft />
      </button>
      <h1 className="headerText">Song</h1>
      <button className="icon">
        <ThreeDots />
      </button>
    </div>
  );
}

// root method
function Index() {
  return (
    <div className="container">
      <Header />
      <Container />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
