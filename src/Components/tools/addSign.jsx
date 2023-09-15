import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import "./tools.css"

const fontOptions = [
  'Helvetica',
  'TimesRoman',
  'Courier',
  'Arial',
  'Georgia',
  'Verdana',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Lucida Console',
  'Palatino Linotype',
];

function PdfSignatureTool() {
  const [pdfFile, setPdfFile] = useState(null);
  const [signatureType, setSignatureType] = useState('text');
  const [signatureText, setSignatureText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Helvetica');
  const [signatureImage, setSignatureImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [outputPdf, setOutputPdf] = useState(null);

  const canvasStyle = {
    border: '1px solid #000',
    margin: 'auto',
  };

  const canvasRef = React.createRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSignatureTypeChange = (e) => {
    setSignatureType(e.target.value);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSignatureImage(file);
  };

  const handleAddSignature = async () => {
    if (!pdfFile || (!signatureText && !signatureImage && !drawing)) {
      alert('Please select a PDF file and provide a signature or draw a signature.');
      return;
    }

    try {
      const pdfData = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfData);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      if (signatureType === 'text') {
        const { width, height } = firstPage.getSize();
        const font = await pdfDoc.embedFont(selectedFont);

        firstPage.drawText(signatureText, {
          x: width / 2 - 50,
          y: height / 2 - 25,
          size: 12,
          color: rgb(0, 0, 0),
          font,
        });
      } else if (signatureType === 'image' && signatureImage) {
        const imageFileData = await signatureImage.arrayBuffer();
        const imageEmbed = await pdfDoc.embedPng(imageFileData);

        const { width, height } = firstPage.getSize();
        firstPage.drawImage(imageEmbed, {
          x: width / 2 - 100,
          y: height / 2 - 50,
          width: 200,
          height: 100,
        });
      } else if (signatureType === 'drawing') {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const imageBytes = Uint8Array.from(atob(image.split(',')[1]), (c) => c.charCodeAt(0));
        const imageEmbed = await pdfDoc.embedPng(imageBytes);

        const { width, height } = firstPage.getSize();
        firstPage.drawImage(imageEmbed, {
          x: width / 2 - 100,
          y: height / 2 - 50,
          width: 200,
          height: 100,
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      setOutputPdf(URL.createObjectURL(blob));

      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'modified-pdf.pdf'; // Set the desired filename
      downloadLink.style.display = 'none';

      // Add the link to the DOM and trigger the click event to download the file
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up by removing the link from the DOM
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error adding signature to PDF:', error);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (prevX && prevY) {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
    }

    prevX = x;
    prevY = y;
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);

    prevX = x;
    prevY = y;
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  let prevX, prevY;

  return (
    <div>
      <h1 className='first-heading'>PDF Signature Tool</h1>
      <p>Add eSign in a PDF document with custom sign, stamp, date and name or request electronic signature from others.</p>

      <div>
        <label>Select a PDF file:</label>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>

      <div>
        <label>Signature Type:</label>
        <div>
          <label>
            <input
              type="radio"
              value="text"
              checked={signatureType === 'text'}
              onChange={handleSignatureTypeChange}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="image"
              checked={signatureType === 'image'}
              onChange={handleSignatureTypeChange}
            />
            Image
          </label>
          <label>
            <input
              type="radio"
              value="drawing"
              checked={signatureType === 'drawing'}
              onChange={handleSignatureTypeChange}
            />
            Draw
          </label>
        </div>
      </div>

      {signatureType === 'text' && (
        <div>
          <label>Choose a Font:</label>
          <select value={selectedFont} onChange={handleFontChange}>
            {fontOptions.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      )}

      {signatureType === 'text' && (
        <div>
          <label>Signature Text:</label>
          <textarea
            rows="4"
            cols="50"
            value={signatureText}
            onChange={(e) => setSignatureText(e.target.value)}
            style={{ fontFamily: selectedFont }}
          />
        </div>
      )}

      {signatureType === 'image' && (
        <div>
          <label>Upload a signature image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      )}

      {signatureType === 'drawing' && (
        <div>
          <label>Draw your signature:</label>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={canvasStyle}
          />
        </div>
      )}

      <button onClick={handleAddSignature}>Add Signature</button>

      {outputPdf && (
        <div>
          <h2>PDF with Signature:</h2>
          <a href={outputPdf} download="modified-pdf.pdf">
            Download PDF with Signature
          </a>
        </div>
      )}
    </div>
  );
}

export default PdfSignatureTool;
