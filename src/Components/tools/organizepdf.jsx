import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function PdfPageOrganizer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDataUri, setPdfDataUri] = useState('');
  const [reorderedPages, setReorderedPages] = useState([]);
  const [pageOrder, setPageOrder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const arrangePages = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file.');
      return;
    }

    setIsLoading(true);

    try {
      const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());

      // Parse the page order provided by the user
      const userPageOrder = pageOrder.split(',').map((n) => parseInt(n.trim()) - 1);

      // Rearrange the pages according to the user's order
      const reorderedDoc = await PDFDocument.create();

      for (const pageIndex of userPageOrder) {
        const [copiedPage] = await reorderedDoc.copyPages(pdfDoc, [pageIndex]);
        reorderedDoc.addPage(copiedPage);
      }

      const modifiedPdfBytes = await reorderedDoc.save();
      const modifiedPdfDataUri = URL.createObjectURL(
        new Blob([modifiedPdfBytes], { type: 'application/pdf' })
      );

      setReorderedPages([...userPageOrder]);
      setPdfDataUri(modifiedPdfDataUri);
    } catch (error) {
      console.error('Error arranging PDF pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>PDF Page Organizer</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Page Order (e.g., 2, 1, 3)"
        value={pageOrder}
        onChange={(e) => setPageOrder(e.target.value)}
      />
      <button onClick={arrangePages} disabled={isLoading}>
        Arrange Pages
      </button>

      {isLoading && <p>Arranging pages...</p>}
      {reorderedPages.length > 0 && (
        <div>
          <h3>Reordered Page Order:</h3>
          <p>{reorderedPages.map((page) => `Page ${page + 1}`).join(', ')}</p>
        </div>
      )}

      {pdfDataUri && (
        <iframe
          src={pdfDataUri}
          title="Reordered PDF"
          width="100%"
          height="500px"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
}

export default PdfPageOrganizer;
