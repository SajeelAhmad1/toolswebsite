import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfSplitter() {
  const [pdf, setPdf] = useState(null);
  const [splitPages, setSplitPages] = useState('');
  const [outputPdfUrls, setOutputPdfUrls] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPdf(selectedFile);
  };

  const parsePageRanges = (pageRanges) => {
    return pageRanges.split(',').map((range) => {
      const [start, end] = range.split('-').map(Number);
      return { start, end };
    });
  };

  const splitPdf = async () => {
    if (!pdf) {
      alert('Please select a PDF file to split.');
      return;
    }

    const pdfBytes = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const numPages = pdfDoc.getPageCount();
    const parsedPageRanges = parsePageRanges(splitPages);

    const splitPdfUrls = [];

    for (const range of parsedPageRanges) {
      if (range.start < 1 || range.end > numPages || range.start > range.end) {
        alert('Invalid page range detected. Please check your page ranges.');
        return;
      }

      const newPdf = await PDFDocument.create();
      for (let i = range.start - 1; i < range.end; i++) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
      }

      const splitPdfBytes = await newPdf.save();
      const blob = new Blob([splitPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      splitPdfUrls.push(url);
    }

    setOutputPdfUrls(splitPdfUrls);
  };

  return (
    <div>
      <h2>PDF Splitter</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter page ranges (e.g., 1-3, 5-7)"
        onChange={(e) => setSplitPages(e.target.value)}
      />
      <button onClick={splitPdf}>Split PDF</button>
      {outputPdfUrls.length > 0 && (
        <div>
          <h3>Split PDFs:</h3>
          {outputPdfUrls.map((url, index) => (
            <div key={index}>
              <a href={url} download={`split_${index + 1}.pdf`}>
                Download Split {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PdfSplitter;
