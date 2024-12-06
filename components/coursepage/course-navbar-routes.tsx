"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import at from "../../public/at.png"
import Generativemodel from "../GenerativeModal";

const NavbarRoutes = () => {
    const [clicked,setClicked] = useState(false);
    return(
        <div className="flex items-center ml-auto">
            <Image src={at} alt="logo" width={50} height={50} className="cursor-pointer"  onClick={() => setClicked(true)}/>
            {clicked && <Generativemodel isOpen={clicked} onClose={() => setClicked(false)} />}
        </div>
    )
}
export default NavbarRoutes;

