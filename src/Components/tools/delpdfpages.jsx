import React, { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

function DeletePdfPages() {
  const fileInputRef = useRef(null);
  const pageIndexInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleFileChange = async () => {
    setIsLoading(true);

    try {
      const file = fileInputRef.current.files[0];
      const pageIndexToDelete = parseInt(pageIndexInputRef.current.value, 10);

      if (isNaN(pageIndexToDelete)) {
        alert('Please enter a valid page index.');
        setIsLoading(false);
        return;
      }

      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      if (pageIndexToDelete < 0 || pageIndexToDelete >= pdfDoc.getPageCount()) {
        alert('Invalid page index. Please enter a valid page index.');
        setIsLoading(false);
        return;
      }

      const newPdfDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();

      for (let i = 0; i < pages.length; i++) {
        if (i !== pageIndexToDelete) {
          const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
          newPdfDoc.addPage(copiedPage);
        }
      }

      const modifiedPdfBytes = await newPdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      setPdfBlob(modifiedPdfBlob);
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting pages:', error);
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modified.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <h2>Delete PDF Pages</h2>
      <label>Enter Page Index to Delete: </label>
      <input type="number" ref={pageIndexInputRef} />
      <input type="file" accept=".pdf" ref={fileInputRef} />
      <button onClick={handleFileChange} disabled={isLoading}>
        Delete Page
      </button>
      {isLoading && <p>Deleting Page...</p>}
      {pdfBlob && (
        <div>
          <h3>Download Modified PDF:</h3>
          <button onClick={handleDownloadPdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default DeletePdfPages;
