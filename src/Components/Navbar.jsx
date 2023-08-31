import {Link} from "react-router-dom"
import { useState } from "react";
import "./Navbar.css"
function Navbar() {

  const [active, setActive] = useState(false);
  let activeItem = active === true ? "active" : "";
  const [openDropdown, setopenDropdown] = useState(false);
  let arrow = openDropdown === true ? "up" : "down";
  return (
    <>
      <nav>
        <div class="logo">
          <Link to="/">
            <img src="images/logo.svg" alt="" />
          </Link>
        </div>
        

        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <ul>
          <li>
            <Link to="/">MERGE PDF</Link>
          </li>
          <li>
            <Link to="/">SPLIT PDF</Link>
          </li>
          <li>
            <Link to="/">COMPREDD PDF</Link>
          </li>
          <li>
            <Link to="/">CONVERT PDF</Link>
          </li>
          <li>
            <Link to="/">ALL TOOLS</Link>
          </li>
          
          
          
        </ul>
      </nav>
      
    </>
  );
};



export default Navbar;
