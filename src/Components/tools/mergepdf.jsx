import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import "./tools.css"

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
    <div className='body'>
      <h1 className='first-heading'>PDF Merger</h1>
      <p>Combine your multiple PDFs files into one PDFs document free in just few seconds.</p>


      {/* ad area */}
      <div className='ad-area'>

      </div>
      {/* ad area */}
      {/* <div className="download-btn" onChange={handleFileChange} >
      <input type="file" accept=".pdf" multiple /></div> */}



      <div class="download-btn" onChange={handleFileChange}>
        <input type="file" accept=".pdf" multiple/>
        <label for="fileInput" class="file-label">
            
            
        </label>
    </div>



    {/* <br /> */}

<div className='merge-btn' onClick={mergePdfs}>
      <button >Merge PDFs</button>
      </div>


      {/* ad area */}
      <div className='ad-area'>

      </div>
      {/* ad area */}


      {mergedPdf && (
        <div className='download-btn'>
          <a href={mergedPdf} download="merged.pdf" style={{color:'white'}}>
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default PdfMerger;
