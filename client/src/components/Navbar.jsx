import { useState } from "react";
import Dashboard from "./Dashboard";
import { Link } from 'react-router-dom';
import { navLinks } from "../constants";
import logo from '../assets/logo.png';

export default function Nav() {
    const [active, setActive] = useState("");
    
    return (
        <nav className="relative container z-0 mx-auto px-6">
           <div className="flex flex-row justify-between items-center">
              <div>
                <Link to="/" className='flex items-center gap-2'
                onClick={() => {
                    setActive("")
                    window.scrollTo(0,0);
                }}
                >
                 <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
               </Link>
              </div>
              <ul className='list-none hidden sm:flex flex-row gap-10'>
              {navLinks.map((link) => (
                <li
                key={link.id}
                className={`${
                active === link.title
                    ? "text-black"
                    : "text-gray-400"
                } hover:text-gray-500 text[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}>
                <a href={`#${link.id}`}>{link.title}</a>
                </li>
                ))}
             </ul>
           </div>
        </nav>
    )
}