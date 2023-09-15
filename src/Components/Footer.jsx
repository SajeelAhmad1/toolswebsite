import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer
        style={{ backgroundColor: "#f6f6f8", paddingTop:'100px', paddingBottom:'100px' }}
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
            <h2 className="text-black text-2xl"style = {{color:'#e5322d'}}>Quick Links</h2>
            <div className="flex flex-col"><br />
              <Link to="/" className="hover:text-black" style={{paddingBottom:'4px'}}>
                PDF to Text
              </Link>
              <Link to="/tutorials/Chapter1" className="hover:text-black" style={{paddingBottom:'4px'}}>
                PDF to Word
              </Link>
              <Link to="/quizes/quiz1" className="hover:text-black" style={{paddingBottom:'4px'}}>
                PDF to Power Point
              </Link>
              <Link to="/cppatglance" className="hover:text-black" style={{paddingBottom:'4px'}}>
                Merge PDFs
              </Link>
            </div>
          </div>
          <div className="text-gray-600">
            <h2 className="text-black text-2xl"style = {{color:'#e5322d'}}>Help</h2>
            <div className="flex flex-col"><br />
              <Link to="/about-us" className="hover:text-black" style={{paddingBottom:'4px'}}>
                About
              </Link>
              <Link to="/contact-us" className="hover:text-black" style={{paddingBottom:'4px'}}>
                Contact
              </Link>
              <Link to="/privacy-policy" className="hover:text-black" style={{paddingBottom:'4px'}}>
                Privacy Policy
              </Link>
              <Link to="/features" className="hover:text-black" style={{paddingBottom:'4px'}}>
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
