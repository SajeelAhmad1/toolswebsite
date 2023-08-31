import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
    <div style={{width:'80%', marginLeft:'10%', marginTop:'5%', marginBottom:'5%'}}>
      <h1 style={{fontSize:'30px', fontWeight:'900'}}>About Us</h1>
      <div className="ui clearing divider"></div>
      <p style={{fontSize:'20px'}}>
        PDFClear born in 2020. PDFClear provide to a user-friendly interface
        with all PDF tools on one platform. Our team makes every effort to
        provide a <b>free, accurate</b> and <b>top-quality</b> service 24/7. Our team improve
        all PDF tools and develop new PDF tools to provide a enjoyable platform.
        You can inform us for any further improvements and your valuable
        feedback. Your opinion will be very important to us{" "}
      </p><br />
      <div style={{textAlign:'center', marginTop:'5%'}}>
      <Link to='/contact-us'><button style={{fontSize:'20px'}}class="ui black button">Contact Us</button></Link>
      </div>
    </div></>
  );
};
export default About;
