import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center"  style={{padding:'20px'}}>
        <div className="logo flex items-center">
          <Link to="/">
            <img src="images/logo.svg" alt="" />
          </Link>
        </div>

        <div className="lg:flex hidden pr-40 text-center space-x-4  ">
          <ul>
            <li className="pr-0">
              <button className="text-xl">
                <Link to="/">MERGE PDF</Link>
              </button>
            </li>
            </ul>
            

              <button className="text-xl">
                <Link to="/">SPLIT PDF</Link>
              </button>
              <button className="text-xl">
                <Link to="/">COMPRESS PDF</Link>
              </button>
              <button className="text-xl">
                <Link to="/">CONVERT PDF</Link>
              </button>
              
              <ul>
            <li className="pr-60">
            <button className="text-xl">
                <Link to="/">ALL TOOLS</Link>
              </button>
            </li>
            </ul>
          
        </div>

        <div className="lg:hidden flex items-center ">
          <button
            onClick={toggleMenu}
            className="text-3xl leading-none focus:outline-none p-2"
          >
            &#8801;
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden h-15">
          <ul className="p-4 space-y-2">
            <li className="text-center">
              <button className="text-sm">MERGE PDF</button>
            </li>
            <li className="text-center">
              <button className="text-sm">SPLIT PDF</button>
            </li>
            <li className="text-center">
              <button className="text-sm">COMPRESS PDF</button>
            </li>
            <li className="text-center">
              <button className="text-sm">CONVERT PDF</button>
            </li>
            <li className="text-center">
              <button className="text-sm">ALL TOOLS</button>
            </li>
            {/* <li className="text-center">
              <button class="bg-gray-800 text-white hover:bg-white hover:text-black pt-2 pb-2 pl-4 pr-4 rounded-full ">
                Contact
              </button>
            </li> */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
