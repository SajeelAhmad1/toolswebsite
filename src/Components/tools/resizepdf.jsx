import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfResizeTool() {
  const [pdfFile, setPdfFile] = useState(null);
  const [newWidth, setNewWidth] = useState(595); // Default width (A4 size in points)
  const [newHeight, setNewHeight] = useState(842); // Default height (A4 size in points)

  const handleFileUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleResize = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file.');
      return;
    }

    try {
      const pdfBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBuffer);

      pdfDoc.getPages().forEach(async (page) => {
        const currentWidth = page.getWidth();
        const currentHeight = page.getHeight();

        // Calculate the scaling factors for width and height
        const widthScale = newWidth / currentWidth;
        const heightScale = newHeight / currentHeight;

        // Create a new page with the desired size
        const newPage = pdfDoc.addPage([newWidth, newHeight]);

        // Draw the original page content onto the new page
        const [x1, y1, x2, y2] = newPage.getMediaBox();
        const scaleFactor = Math.min(widthScale, heightScale);
        newPage.drawImage(page, {
          x: x1,
          y: y1,
          width: x2 - x1,
          height: y2 - y1,
          scaleX: scaleFactor,
          scaleY: scaleFactor,
        });

        // Remove the original page
        pdfDoc.removePage(page);
      });

      const resizedPdfBytes = await pdfDoc.save();

      const blob = new Blob([resizedPdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'resized.pdf';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error resizing PDF:', error);
    }
    
  };

  return (
    <div>
      <h2>PDF Resize Tool</h2>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <div>
        <label>New Page Width (points):</label>
        <input
          type="number"
          value={newWidth}
          onChange={(e) => setNewWidth(Number(e.target.value))}
        />
      </div>
      <div>
        <label>New Page Height (points):</label>
        <input
          type="number"
          value={newHeight}
          onChange={(e) => setNewHeight(Number(e.target.value))}
        />
      </div>
      <button onClick={handleResize}>Resize PDF</button>
    </div>
  );
}

export default PdfResizeTool;
