import React from "react";

const Contact = () => {
  return (
    <>
    <div style={{width:'80%', marginLeft:'10%', marginTop:'5%', marginBottom:'13%'}}>
      <h1 style={{fontSize:'30px', fontWeight:'900'}}>Contact Us</h1>
      <div className="ui clearing divider"></div>
      <p style={{fontSize:'20px'}}>
        Contact us at <span style={{color:'red'}}>contact@pdfclear.com</span>
      </p><br />
      <div style={{textAlign:'center', marginTop:'5%'}}>
      {/* <button style={{fontSize:'20px'}}class="ui black button">Contact Us</button> */}
      </div>
    </div></>
  );
};
export default Contact;
