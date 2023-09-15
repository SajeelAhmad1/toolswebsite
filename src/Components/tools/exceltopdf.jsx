import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import jsPDF from 'jspdf';
import "./tools.css"

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
    <div className='body'>
      <h2 className='first-heading'>Excel to PDF Converter</h2>
      <p>Make a PDF file easily form XLS & XLSX spreadsheets within few clicks.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
<div className="download-btn">
      <input type="file" accept=".xlsx" onChange={handleFileChange} /></div>
      <div className="merge-btn">
      <button onClick={convertToPdf}>Convert to PDF</button></div>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
    </div>
  );
}

export default ExcelToPdfConverter;
