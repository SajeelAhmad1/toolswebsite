import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import * as diff from 'diff';

function ComparePdfFiles() {
  const [pdfFile1, setPdfFile1] = useState(null);
  const [pdfFile2, setPdfFile2] = useState(null);
  const [differences, setDifferences] = useState([]);

  const handleFile1Change = (event) => {
    const file = event.target.files[0];
    setPdfFile1(file);
  };

  const handleFile2Change = (event) => {
    const file = event.target.files[0];
    setPdfFile2(file);
  };

  const comparePDFs = async () => {
    if (!pdfFile1 || !pdfFile2) {
      alert('Please select both PDF files.');
      return;
    }

    try {
      const pdfData1 = new Uint8Array(await pdfFile1.arrayBuffer());
      const pdfData2 = new Uint8Array(await pdfFile2.arrayBuffer());

      pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

      const pdf1 = await pdfjs.getDocument({ data: pdfData1 }).promise;
      const pdf2 = await pdfjs.getDocument({ data: pdfData2 }).promise;

      const text1 = await extractTextFromPDF(pdf1);
      const text2 = await extractTextFromPDF(pdf2);

      const differences = diff.diffLines(text1, text2);
      setDifferences(differences);
    } catch (error) {
      console.error('Error comparing PDFs:', error);
    }
  };

  const extractTextFromPDF = async (pdfDocument) => {
    const numPages = pdfDocument.numPages;
    let text = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pdfPage = await pdfDocument.getPage(pageNum);
      const textContent = await pdfPage.getTextContent();

      textContent.items.forEach((item) => {
        text += item.str + ' ';
      });
    }

    return text;
  };

  return (
    <div>
      <h2>Compare PDF Files</h2>
      <div>
        <label>Select PDF File 1:</label>
        <input type="file" accept=".pdf" onChange={handleFile1Change} />
      </div>
      <div>
        <label>Select PDF File 2:</label>
        <input type="file" accept=".pdf" onChange={handleFile2Change} />
      </div>
      <button onClick={comparePDFs}>Compare PDFs</button>
      {differences.length > 0 && (
        <div>
          <h3>Differences:</h3>
          <pre>
            {differences.map((part, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: part.added ? 'green' : part.removed ? 'red' : 'white',
                }}
              >
                {part.value}
              </span>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ComparePdfFiles;
