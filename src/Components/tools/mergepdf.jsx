import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function PdfMerger() {
  const [pdfs, setPdfs] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPdfs(selectedFiles);
  };

  const mergePdfs = async () => {
    if (pdfs.length < 2) {
      alert('Please select at least two PDF files to merge.');
      return;
    }

    const mergedDoc = await PDFDocument.create();

    for (const pdf of pdfs) {
      const pdfBytes = await pdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => mergedDoc.addPage(page));
    }

    const mergedPdfBytes = await mergedDoc.save();

    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setMergedPdf(url);
  };

  return (
    <div>
      <h2>PDF Merger</h2>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
      <button onClick={mergePdfs}>Merge PDFs</button>
      {mergedPdf && (
        <div>
          <a href={mergedPdf} download="merged.pdf">
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default PdfMerger;
