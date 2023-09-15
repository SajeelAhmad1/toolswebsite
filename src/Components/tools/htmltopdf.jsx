import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import "./tools.css"

function HtmlToPdfConverter() {
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHtmlContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const convertHtmlToPdf = () => {
    if (!htmlContent) {
      alert('Please upload an HTML file first.');
      return;
    }

    const doc = new jsPDF();
    doc.html(htmlContent, {
      callback: function (pdf) {
        pdf.save('converted.pdf');
      },
    });
  };

  return (
    <div className="body">
      <h1 className='first-heading'>HTML to PDF Converter</h1>
      <p>Convert webpages or HTML files in PDF files using PDFClear online in one click.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
<div className="download-btn">
      <input type="file" accept=".html" onChange={handleFileUpload} /></div>
      <div className='merge-btn'>

      <button onClick={convertHtmlToPdf}>Convert HTML to PDF</button></div>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
    </div>
  );
}

export default HtmlToPdfConverter;
