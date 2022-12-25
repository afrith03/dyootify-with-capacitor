import "./App.css";
import Navbar from "./components/navbar";
import SongContent from "./components/SongContent";
import { useEffect, useState } from "react";
import axios from "axios";
// import { buildQueries } from "@testing-library/react";
import Spinner from "./components/Spinner";

function App() {
  const [loadedSongs, setloadedSongs] = useState([]);
  const [loading, setloading] = useState(false);
  const [darkMode, setdarkMode] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(0);
  useEffect(() => {
    // document.body.background = "#161d20"
    document.body.style = `background:${darkMode ? "#462552":"#161d20"};`;
  }, [darkMode]);
  useEffect(() => {
    axios
      .get("https://dyootify-server.vercel.app/getsongs")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setloadedSongs(response.data);
        setloading(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert(
          "Something is wrong! please check the network and restart the app."
        );
        // loadCustomSongs("all");
      });
  }, []);

  const loadCustomSongs = (e) => {
    console.log(e.target.name);
    setloading(false);
    axios
      .get("https://dyootify-server.vercel.app/getsongs", {
        headers: {
          "Content-Type": "application/json",
          language: e.target.name,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setcurrentIndex(0);
        setloadedSongs(response.data);
        setloading(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert(
          "Something is wrong! please check the network and restart the app."
        );
        // loadCustomSongs("all");
      });
  };
  return (
    <div className={`App ${darkMode ? "" : "dark"}`}>
      <Navbar darkMode={darkMode} setdarkMode={setdarkMode} />
      {!loading && <Spinner />}
      {loading && (
        <SongContent
          loadedSongs={loadedSongs}
          setloadedSongs={setloadedSongs}
          loadCustomSongs={loadCustomSongs}
          loading={loading}
          currentIndex={currentIndex}
          setcurrentIndex={setcurrentIndex}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;
// npm run build
// npx cap sync
// npx cap open android


// icons 
// npm install -g cordova-res 

// resources/
// ├── android/
//         └── icon-background.png
//         └── icon-foreground.png
// ├── icon.png
// └── splash.png


// cordova-res android --skip-config --copy 