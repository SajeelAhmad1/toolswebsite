import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import "./tools.css"

function PdfToExcelConverter() {
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
      let currentLine = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const pageText = await page.getTextContent();
        pageText.items.forEach((item) => {
          currentLine += item.str;
          // Check for conditions to break the line (e.g., full stop at the end of a line)
          if (item.str.endsWith('.') && isMeaningfulMessage(currentLine)) {
            textContent.push(currentLine);
            currentLine = '';
          }
        });
      }

      // Add any remaining text to the last line
      if (currentLine.trim() !== '') {
        textContent.push(currentLine);
      }

      setPdfText(textContent.join('\n'));
    } catch (error) {
      console.error('Error extracting text:', error);
    }

    setIsLoading(false);
  };

  // Function to check if a line contains a meaningful message
  const isMeaningfulMessage = (line) => {
    // You can define your own criteria for what constitutes a meaningful message
    // For example, you can check if the line is longer than a certain length
    // or if it contains specific keywords that indicate meaningful content
    return line.length > 10; // Example: Consider lines longer than 10 characters as meaningful
  };

  const handleDownload = () => {
    // Convert the text to an Excel file with one column and one row per line of text
    const worksheet = XLSX.utils.aoa_to_sheet(pdfText.split('\n').map((line) => [line]));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PDF Text');
    XLSX.writeFile(workbook, 'extracted_text.xlsx');
  };

  return (
    <div className='body'>
      <h2 className='first-heading'>PDF to Excel Converter</h2>
      <p>Convert your PDFs file into a Microsoft Excel or XLS spreadsheets.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
<div className='download-btn'>
      <input type="file" accept=".pdf" onChange={handleFileChange} /></div>
      {isLoading && <p>Converting...</p>}
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      {pdfText && (
        <div className='merge-btn'>
          
          <button onClick={handleDownload}>Download Excel File</button>
        </div>
      )}
    </div>
  );
}

export default PdfToExcelConverter;
