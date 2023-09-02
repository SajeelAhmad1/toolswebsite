import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

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
    <div className="html-to-pdf-converter">
      <h1>HTML to PDF Converter</h1>
      <input type="file" accept=".html" onChange={handleFileUpload} />
      <button onClick={convertHtmlToPdf}>Convert HTML to PDF</button>
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
    </div>
  );
}

export default HtmlToPdfConverter;
