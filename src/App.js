import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import SongContent from "./components/SongContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { buildQueries } from "@testing-library/react";
import Spinner from "./components/Spinner";

function App() {
  const [loadedSongs, setloadedSongs] = useState([]);
  const [loading, setloading] = useState(false);

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
        alert("Something is wrong! please check the network and restart the app.")
      });
  }, []);

//   const options = {
//     method: 'POST',
//     url: 'https://microsoft-translator-text.p.rapidapi.com/Detect',
//     params: { 'api-version': '3.0' },
//     headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': 'your-rapidapi-key',
//         'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
//     },
//     data: [
//         {
//             Text: 'Ich würde wirklich gern Ihr Auto um den Block fahren ein paar Mal.',
//         },
//     ],
// };

  const loadCustomSongs = (e) => {
    console.log(e.target.name);
    setloading(false);
    axios
      .get(
        "https://dyootify-server.vercel.app/getsongs",{ data: {
          "language":"telugu"
        }}
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setloadedSongs(response.data);
        setloading(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("Something is wrong! please check the network and restart the app.")
      });
  };
  return (
    <div className="App">
      <Navbar />
      {!loading && <Spinner />}
      {loading && (
        <SongContent
          loadedSongs={loadedSongs}
          setloadedSongs={setloadedSongs}
          loadCustomSongs={loadCustomSongs}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;
// npm run build
// npx cap sync
// npx cap open android
