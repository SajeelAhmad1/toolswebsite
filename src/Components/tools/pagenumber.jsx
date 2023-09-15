import React, { useRef, useState } from 'react';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import "./tools.css"

function PageNumberTool() {
  const fileInputRef = useRef(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pageNumberStart, setPageNumberStart] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const addPageNumbers = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file first.');
      return;
    }

    setIsLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const fontSize = 12;

        const text = `Page ${i + pageNumberStart}`;

        page.drawText(text, {
          x: width - 100,
          y: 30,
          size: fontSize,
          color: rgb(0, 0, 0), // Black color
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create a download link for the Blob
      const a = document.createElement('a');
      a.href = url;
      a.download = 'page-numbered-document.pdf';
      a.style.display = 'none';

      // Append the "a" element to the body and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsLoading(false);
    } catch (error) {
      console.error('Error adding page numbers:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className='first-heading'>Add Page Number </h2>
      <p>Add page numbers to your PDF files with custom position & dimensions with in few seconds.</p>
      <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} />
      <input
        type="number"
        placeholder="Start page number"
        value={pageNumberStart}
        onChange={(e) => setPageNumberStart(Number(e.target.value))}
      />
      <button onClick={addPageNumbers} disabled={isLoading}>
        Add Page Numbers
      </button>
      {isLoading && <p>Adding page numbers...</p>}
    </div>
  );
}

export default PageNumberTool;
