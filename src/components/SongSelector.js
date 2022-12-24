import React from 'react'
import { BiUpArrowAlt } from "react-icons/bi";

function SongSelector({setopenCloseModal,openCloseModal,loadedSongs,currentIndex,setcurrentIndex,loadCustomSongs}) {
  return (
    <div className="absolute bg-colorlg text-colorsm bottom-0 w-full bg-violet-400 p-4 m-0 rounded-t-xl lg:w-80">
    <div
      onClick={() => {
        setopenCloseModal(!openCloseModal);
      }}
      className="flex justify-between items-center"
    >
      <img
        className="w-12 h-12 rounded-sm"
        src={loadedSongs[currentIndex].imageUrl}
      />
      <div>
        <h3 className="text-xl font-bold">
          {loadedSongs[currentIndex].fileTitle.replace(/blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi, function (x) {
  return " " ;
})}
        </h3>
        <h4 className="text-lg font-semibold">
          {loadedSongs[currentIndex].fileArtist.slice(0, 18).replace(/blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi, function (x) {
  return " " ;
})} | {loadedSongs[currentIndex].language}
        </h4>
      </div>
      <BiUpArrowAlt />
    </div>
    {/* song scroll */}
    <div
      className={openCloseModal ? "block overflow-y-scroll scroll-m-0 scroll-p-0 stroke-colorxl h-96" : "hidden"}
    >
      <div>
      <button >All</button>
        <button name='tamil' onClick={(e)=>{
          loadCustomSongs(e)
        }}>Tamil</button>
        <button >English</button>
        <button >Telugu</button>
        <button  name='hindi' onClick={(e)=>{
          loadCustomSongs(e)
        }}>Hindi</button>
      </div>
      {loadedSongs.map((song, index) => (
        <div
          key={index}
          onClick={() => {
            console.log(song);
            setcurrentIndex(index);
          }}
          className="flex justify-between bg-colormd items-center m-1 rounded-lg px-2 py-1"
        >
         
          <div className=''>
            <h3 className="text-xl font-bold text-left">{song.fileTitle.replace(/blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi, function (x) {
  return " " ;
})}</h3>
            <h4 className="text-lg font-semibold">{song.fileArtist.slice(0, 18)+"...".replace(/blue|MassTamilan.dev|-|isaitamilan.co|SenSongsMp3.Com|:/gi, function (x) {
  return " " ;
})}</h4>
          </div>
          <img
            className="w-12 h-12 rounded-md"
           // src="https://images.unsplash.com/photo-1671180895327-e5a3eee7bae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            src={song.imageUrl}
          />
        </div>
      ))}
    </div>
    {/* song scroll end */}
  </div>
  )
}

export default SongSelector