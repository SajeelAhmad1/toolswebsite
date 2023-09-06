import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function ProtectPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [protectedPdf, setProtectedPdf] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const protectPdf = async () => {
    if (!pdfFile || !password) {
      alert('Please select a PDF file and enter a password.');
      return;
    }

    setIsLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Password protect the PDF
      pdfDoc.setUserPassword(password);

      const protectedPdfBytes = await pdfDoc.save();

      setProtectedPdf(new Blob([protectedPdfBytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error('Error protecting PDF:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Protect PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={protectPdf}>Protect PDF</button>
      {isLoading && <p>Protecting...</p>}
      {protectedPdf && (
        <div>
          <h3>Protected PDF:</h3>
          <a
            href={URL.createObjectURL(protectedPdf)}
            download="protected_pdf.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Protected PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default ProtectPdf;
