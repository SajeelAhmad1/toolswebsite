import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import jsPDF from 'jspdf';

function ExcelToPdfConverter() {
  const [excelFile, setExcelFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  const convertToPdf = () => {
    if (!excelFile) {
      alert('Please select an Excel file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });

      // Convert the first sheet of the Excel workbook to a PDF
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const pdf = new jsPDF();
      pdf.text(10, 10, utils.sheet_to_csv(sheet));
      pdf.save('converted-document.pdf');
    };

    reader.readAsArrayBuffer(excelFile);
  };

  return (
    <div>
      <h2>Excel to PDF Converter</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={convertToPdf}>Convert to PDF</button>
    </div>
  );
}

export default ExcelToPdfConverter;
