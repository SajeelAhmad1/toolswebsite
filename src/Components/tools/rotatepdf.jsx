import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';

function RotatePdfTool() {
  const [pdfFile, setPdfFile] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(90); // Default rotation angle

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
  };

  const rotatePdf = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file to rotate.');
      return;
    }

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Rotate all pages in the PDF
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        page.setRotation(degrees(rotationAngle));
      }

      const modifiedPdfBytes = await pdfDoc.save();

      // Create a Blob from the modified PDF bytes
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rotated-document.pdf';
      a.style.display = 'none';

      // Append the "a" element to the body and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error rotating PDF:', error);
    }
  };

  return (
    <div>
      <h2>Rotate PDF Tool</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <label>
        Rotation Angle:
        <select
          value={rotationAngle}
          onChange={(e) => setRotationAngle(Number(e.target.value))}
        >
          <option value="90">90 degrees (clockwise)</option>
          <option value="180">180 degrees</option>
          <option value="-90">90 degrees (counterclockwise)</option>
        </select>
      </label>
      <button onClick={rotatePdf}>Rotate PDF</button>
    </div>
  );
}

export default RotatePdfTool;
