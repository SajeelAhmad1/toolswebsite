// src/components/PdfToTextConverter.js
import React, { useState } from 'react';
import "./tools.css"

function PdfToTextConverter() {
  const [pdfText, setPdfText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    setIsLoading(true);

    try {
      const pdfjs = await import('pdfjs-dist/webpack');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

      const file = event.target.files[0];
      const pdfData = new Uint8Array(await file.arrayBuffer());
      const loadingTask = pdfjs.getDocument(pdfData);
      const pdf = await loadingTask.promise;

      const textContent = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const pageText = await page.getTextContent();
        pageText.items.forEach((item) => {
          textContent.push(item.str);
        });
      }

      setPdfText(textContent.join('\n'));
    } catch (error) {
      console.error('Error extracting text:', error);
    }

    setIsLoading(false);
  };
  function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(url);
  }
  const handleDownload = () => {
    downloadTextFile(pdfText, 'downloaded_text.txt');
  };
  return (
    <div>
      <h2 className='first-heading'>PDF to Text Converter</h2>
      <p>Convert PDF to text using PDFClear and edit test easily.</p>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {isLoading && <p>Converting...</p>}
      {pdfText && (
        <div>
          <h3>Extracted Text:</h3>
          <button onClick={handleDownload}>Download Text File</button>
        </div>
      )}
    </div>
  );
}

export default PdfToTextConverter;