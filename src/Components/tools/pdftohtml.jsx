import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import "./tools.css"

// Import the worker from the pdfjs-dist package
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PdfToHtmlConverter() {
  const [pdfFile, setPdfFile] = useState(null);
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

  const convertPdfToHtml = () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    const doc = new pdfjs.getDocument(pdfFile);

    doc.promise.then(function (pdfDoc_) {
      var pdfDoc = pdfDoc_;
      var numPages = pdfDoc.numPages;
      var i = 1;
      pdfDoc.getPage(i).then(function (page) {
        // Create a canvas element to render the PDF page
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        // Set the canvas size to match the PDF page
        canvas.width = page.view[2];
        canvas.height = page.view[3];

        // Render the PDF page into the canvas context
        var renderContext = {
          canvasContext: context,
          viewport: page.view,
        };
        page.render(renderContext).promise.then(function () {
          // Convert the canvas to HTML
          var html = `<div class="pdf-page" style="width: ${canvas.width}px;">`;
          html += `<img src="${canvas.toDataURL()}" alt="Page ${i}" />`;
          html += `</div>`;

          // Append the HTML content
          setHtmlContent(html);

          // Download the HTML content as a file
          downloadHtmlFile(html);
        });
      });
    });
  };

  const downloadHtmlFile = (html) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="body">
      <h1 className='first-heading'>PDF to HTML Converter</h1>
      <p>Convert your PDF files to HTML using PDFClear in one click.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
<div className="download-btn">
      <input type="file" accept=".pdf" onChange={handleFileUpload} /></div>
      <div className="merge-btn">
      <button onClick={convertPdfToHtml}>Convert PDF to HTML</button>
      </div>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  );
}

export default PdfToHtmlConverter;
