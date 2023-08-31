import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer
        style={{ backgroundColor: "#f6f6f8" }}
        className="px-4 py-10 text-black flex flex-col md:flex-row justify-between gap-10 md:gap-4 border-t-2"
      >
        <div className="flex flex-col justify-center items-center w-full md:w-1/5">
          <Link to="/" className="text-4xl">
            <img style={{width:"50%", margin:'auto'}} src="images/logo.svg" alt="" />
          </Link><br />
          <p className="text-gray-600" style={{ marginLeft: "10%" }}>
            Online tool for converting files.
          </p>
          <div className="flex gap-3 mt-2 text-xl">
            {/* <a href="/"><FaGithub /></a>
          <a href="/"><FaFacebook /></a>
          <a href="/"><FaInstagram /></a>
          <a href="/"><FaTwitter /></a> */}
          </div>
        </div>
        <div className="flex justify-center gap-32 w-full md:w-1/2">
          <div className="text-gray-600">
            <h2 className="text-black text-2xl">Quick Links</h2>
            <div className="flex flex-col">
              <Link to="/" className="hover:text-black">
                Home
              </Link>
              <Link to="/tutorials/Chapter1" className="hover:text-black">
                Tutorials
              </Link>
              <Link to="/quizes/quiz1" className="hover:text-black">
                Quiz
              </Link>
              <Link to="/cppatglance" className="hover:text-black">
                C++ at Glance
              </Link>
            </div>
          </div>
          <div className="text-gray-600">
            <h2 className="text-black text-2xl">Help</h2>
            <div className="flex flex-col">
              <Link to="/about-us" className="hover:text-black">
                About
              </Link>
              <Link to="/contact-us" className="hover:text-black">
                Contact
              </Link>
              <Link to="/privacy-policy" className="hover:text-black">
                Privacy Policy
              </Link>
              <Link to="/features" className="hover:text-black">
                Features
              </Link>
            </div>
          </div>
        </div>
        <div></div>

        
          
      </footer>
    </>
  );
};

export default Footer;
