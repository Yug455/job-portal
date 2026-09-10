import { useState } from "react"
import { Search } from "lucide-react";
const HeroSection = ({searchText,setSearchText})=>{
   
    return(
        <div>
            <div className="mt-7">
                <h4 className="mx-auto text-center border-blue-400 rounded-sm bg-[#9fd3c7] text-[#f70776] w-72">No.1 Job Finder Website</h4>
            </div>
            <div className="mt-7">
                <h1 className="text-center text-4xl">Search,Apply&</h1><h1 className="text-center text-4xl mt-3">Get Your Intreasted Job</h1>
                <h2 className="text-center">Search The Best Job on the Best Website</h2>
            </div>
            <div className="text-center flex items-center justify-center mt-7">
                <input className="border-2 w-96 text-center rounded-l-2xl border-r-0 h-14" type="text" value={searchText} placeholder="Search Jobs That Exsites You" onChange={(e)=>{setSearchText(e.target.value)}}/>
                <button className="cursor-pointer rounded-r-2xl border-l-0 bg-[#fe346e] border-2 w-14 text-center flex justify-center"><Search className="text-white h-14"/></button>
            </div>
        </div>
    )
}
export default HeroSection