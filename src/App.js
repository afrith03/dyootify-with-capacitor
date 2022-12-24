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
      });
    // .then(function () {
    //   setloadedSongs([
    //     {
    //       _id: "639d8615ac0d457148a39a47",
    //       fileName: "Thee-Thalapathy-MassTamilan.dev.mp3",
    //       fileTitle: "Thee Thalapathy - MassTamilan.dev",
    //       fileAlbum: "Varisu - MassTamilan.dev",
    //       fileArtist: "STR (Silambarasan) - MassTamilan.dev",
    //       filePerformer: "STR (Silambarasan) - MassTamilan.dev",
    //       language: "tamil",
    //       driveId: "1FTal6am_qOBQwgm_BlEUzYxHjCnLHM9F",
    //       driveLink:
    //         "https://drive.google.com/uc?export=download&id=1FTal6am_qOBQwgm_BlEUzYxHjCnLHM9F",
    //       imageUrl: "Unable to get",
    //       fileType: "audio/mpeg",
    //       fileSize: "4.2 MB",
    //       createdAt: "2022-12-17T09:04:21.813Z",
    //       updatedAt: "2022-12-17T09:04:21.813Z",
    //       __v: 0,
    //     },
    //     {
    //       _id: "639d8617ac0d457148a39a49",
    //       fileName: "Ranjithame-MassTamilan.dev.mp3",
    //       fileTitle: "Ranjithame - MassTamilan.dev",
    //       fileAlbum: "Varisu - MassTamilan.dev",
    //       fileArtist: "Vijay, M.M. Manasi - MassTamilan.dev",
    //       filePerformer: "Vijay, M.M. Manasi - MassTamilan.dev",
    //       language: "tamil",
    //       driveId: "1OJ19FawRdrg8y8pHVw_OVLzf4XZkjt6Z",
    //       driveLink:
    //         "https://drive.google.com/uc?export=download&id=1OJ19FawRdrg8y8pHVw_OVLzf4XZkjt6Z",
    //       imageUrl: "Unable to get",
    //       fileType: "audio/mpeg",
    //       fileSize: "4.68 MB",
    //       createdAt: "2022-12-17T09:04:23.934Z",
    //       updatedAt: "2022-12-17T09:04:23.934Z",
    //       __v: 0,
    //     },
    //     {
    //       _id: "639d8619ac0d457148a39a4b",
    //       fileName: "Appatha.mp3",
    //       fileTitle: "Appatha - isaitamilan.co",
    //       fileAlbum: "Naai Sekar Returns",
    //       fileArtist: "Vadivel",
    //       filePerformer: "Vadivel",
    //       language: "tamil",
    //       driveId: "1atbRGFg7q3lsKvzEb4WoMnPCg3VhuxWt",
    //       driveLink:
    //         "https://drive.google.com/uc?export=download&id=1atbRGFg7q3lsKvzEb4WoMnPCg3VhuxWt",
    //       imageUrl: "Unable to get",
    //       fileType: "audio/mpeg",
    //       fileSize: "7.61 MB",
    //       createdAt: "2022-12-17T09:04:25.994Z",
    //       updatedAt: "2022-12-17T09:04:25.994Z",
    //       __v: 0,
    //     },
    //     {
    //       _id: "639d86b4ac0d457148a39a4d",
    //       fileName: "Ranjithame.mp3",
    //       fileTitle: "Ranjithame :: SenSongsMp3.Com",
    //       fileAlbum: "Vaarasudu (2023)",
    //       fileArtist: "Anurag Kulkarni, M M Manasi",
    //       filePerformer: "Anurag Kulkarni, M M Manasi",
    //       language: "telugu",
    //       driveId: "15IZ1iejUl2GvoEIjA5vvrNUawuXsGdBq",
    //       driveLink:
    //         "https://drive.google.com/uc?export=download&id=15IZ1iejUl2GvoEIjA5vvrNUawuXsGdBq",
    //       imageUrl: "Unable to get",
    //       fileType: "audio/mpeg",
    //       fileSize: "5.03 MB",
    //       createdAt: "2022-12-17T09:07:01.000Z",
    //       updatedAt: "2022-12-17T09:07:01.000Z",
    //       __v: 0,
    //     },

    //   ]);
    // });
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
        "https://dyootify-server.vercel.app/getsongs",{
          // data: {
            language:"telugu"
          // }
        }
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
      });
  };
  return (
    <div className="App">
      <Navbar />
      {!loading && <Spinner />}
      {loading && (
        <SongContent
          loadedSongs={loadedSongs}
          loadCustomSongs={loadCustomSongs}
          setloadedSongs={setloadedSongs}
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
