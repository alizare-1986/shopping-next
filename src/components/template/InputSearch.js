"use client"
import { useState } from "react"
import {ImSearch} from "react-icons/im"
function InputSearch() {
    const [search,setSearch]=useState("")
const searchHandler=()=>{
    console.log("search");
}
  return (
    <div>
      <input className=" text-black" type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value.toLowerCase().trim())}/>
      <button onClick={searchHandler}><ImSearch/></button>
    </div>
  )
}

export default InputSearch
