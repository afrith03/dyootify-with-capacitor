import React from 'react'
import { BsMusicNoteList,BsThreeDots } from "react-icons/bs";
function Navbar() {
  return (
    <>
    <div className='flex justify-between items-center w-full text-2xl p-3'
    >
<BsMusicNoteList/>
<BsThreeDots/>

    </div>
    </>)
}

export default Navbar