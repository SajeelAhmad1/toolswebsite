import React, { useRef, useState } from 'react';
import { degrees, PDFDocument, rgb, drawImage } from 'pdf-lib';

function WatermarkPdfTool() {
  const fileInputRef = useRef(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setWatermarkImage(imageFile);
  };

  const applyWatermark = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file first.');
      return;
    }

    setIsLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const watermarkTextValue = watermarkText.trim();
      const watermarkImageFile = watermarkImage;

      for (const page of pages) {
        const { width, height } = page.getSize();
        const fontSize = 30;

        // Add text watermark
        if (watermarkTextValue) {
          page.drawText(watermarkTextValue, {
            x: width / 2 - fontSize * watermarkTextValue.length / 4,
            y: height / 2 - fontSize / 2,
            size: fontSize,
            color: rgb(0, 0, 0), // Black color
            rotate: degrees(45), // Rotate text by 45 degrees (adjust as needed)
          });
        }

        // Add image watermark
        if (watermarkImageFile) {
          const imageBytes = await watermarkImageFile.arrayBuffer();
          const image = await pdfDoc.embedPng(imageBytes);
          const { width: imgWidth, height: imgHeight } = image.scale(0.5); // Adjust scale as needed
          const imgX = width / 2 - imgWidth / 2;
          const imgY = height / 2 - imgHeight / 2;

          page.drawImage(image, {
            x: imgX,
            y: imgY,
            width: imgWidth,
            height: imgHeight,
          });
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create a download link for the Blob
      const a = document.createElement('a');
      a.href = url;
      a.download = 'watermarked-document.pdf';
      a.style.display = 'none';

      // Append the "a" element to the body and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsLoading(false);
    } catch (error) {
      console.error('Error applying watermark:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Watermark PDF Tool</h2>
      <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} />
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Enter watermark text"
        value={watermarkText}
        onChange={(e) => setWatermarkText(e.target.value)}
      />
      <button onClick={applyWatermark} disabled={isLoading}>
        Apply Watermark
      </button>
      {isLoading && <p>Applying watermark...</p>}
    </div>
  );
}

export default WatermarkPdfTool;
