import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import "./tools.css"

const PdfCompressor = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const compressPdf = async () => {
    try {
      if (!pdfFile) {
        alert('Please select a PDF file.');
        return;
      }

      // Load the selected PDF file
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Serialize the PDF to bytes
      const compressedPdfBytes = await pdfDoc.save({
        objectsPerTick: 50, // Increase this value for faster compression (trade-off with memory)
      });

      // Create a Blob from the bytes
      const compressedPdfBlob = new Blob([compressedPdfBytes], {
        type: 'application/pdf',
      });

      // Create a download link for the compressed PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(compressedPdfBlob);
      downloadLink.download = 'compressed.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('An error occurred while compressing the PDF file.');
    }
  };

  return (
    <div className="body">
      <h2 className='first-heading'>PDF Compressor</h2>
      <p>Reduce your PDF file size without losing quality.</p>
      {/* ad area */}
      <div className='ad-area'>

      </div>
      {/* ad area */}
      <div className="download-btn">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <br />
      <div className="merge-btn">
      <button onClick={compressPdf}>Compress PDF</button>
      </div>
      {/* ad area */}
      <div className='ad-area'>

      </div>
      {/* ad area */}
    </div>
  );
};

export default PdfCompressor;
