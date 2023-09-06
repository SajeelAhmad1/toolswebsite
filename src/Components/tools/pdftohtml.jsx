import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfToHtmlConverter() {
  const [pdfFile, setPdfFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const convertPdfToHtml = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    try {
      const pdfBytes = await fetch(URL.createObjectURL(pdfFile)).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await pdfjs.getDocument({ data: pdfBytes }).promise;
      const numPages = pdfDoc.numPages;

      let html = '';

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const pdfPage = await pdfDoc.getPage(pageNumber);
        const viewport = pdfPage.getViewport({ scale: 1 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await pdfPage.render({ canvasContext: context, viewport }).promise;

        const imageDataUri = canvas.toDataURL('image/png');

        // Convert each page to HTML with an image tag and styling
        html += `<div class="pdf-page" style="width: ${viewport.width}px;">`;
        html += `<img src="${imageDataUri}" alt="Page ${pageNumber}" />`;
        html += `</div>`;
      }

      // Wrap the generated HTML in a container with width settings
      const fullHtml = `<div style="width: 100%;">${html}</div>`;
      setHtmlContent(fullHtml);
      downloadHtmlFile(fullHtml);
    } catch (error) {
      console.error('Error converting PDF to HTML:', error);
      alert('An error occurred while converting PDF to HTML.');
    }
  };

  const downloadHtmlFile = (html) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pdf-to-html-converter">
      <h1>PDF to HTML Converter</h1>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <button onClick={convertPdfToHtml}>Convert PDF to HTML</button>
      {/* <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div> */}
    </div>
  );
}

export default PdfToHtmlConverter;
