import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfToJpgConverter() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const convertPdfToJpg = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    try {
      const pdfBytes = await fetch(URL.createObjectURL(pdfFile)).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await pdfjs.getDocument({ data: pdfBytes }).promise;
      const numPages = pdfDoc.numPages;

      // Create a zip archive to store the JPG images
      const JSZip = require('jszip');
      const zip = new JSZip();

      // Convert each page to JPG and add to the zip archive
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const pdfPage = await pdfDoc.getPage(pageNumber);

        // Create a canvas element to render the PDF page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match the PDF page size
        const viewport = pdfPage.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the PDF page on the canvas
        await pdfPage.render({ canvasContext: context, viewport }).promise;

        // Convert the canvas to a data URL (JPG format)
        const dataURL = canvas.toDataURL('image/jpeg');

        // Add the JPG image to the zip archive
        zip.file(`page_${pageNumber}.jpg`, dataURL.split(',')[1], { base64: true });
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Save the zip file as a downloadable file
      saveAs(zipBlob, 'converted_pages.zip');
    } catch (error) {
      console.error('Error converting PDF to JPG:', error);
      alert('An error occurred while converting PDF to JPG.');
    }
  };

  return (
    <div className="pdf-to-jpg-converter">
      <h1>PDF to JPG Converter</h1>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <button onClick={convertPdfToJpg}>Convert PDF to JPG</button>
    </div>
  );
}

export default PdfToJpgConverter;
