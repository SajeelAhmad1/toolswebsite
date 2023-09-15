import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import "./tools.css"

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
    <div className='body'>
      <h2 className='first-heading'>PDF Splitter</h2>
      <p>Extract pages from your PDF file or save a set of PDF pages easily. </p>
      {/* ad area */}
      <div className='ad-area'>

      </div>
      {/* ad area */}
      <div class="download-btn" onChange={handleFileChange} >
      <input type="file" accept=".pdf"  /></div>
      <div style={{fontSize:'20px', width:'20%', marginLeft:'39%', marginBottom:'2%'}}>
      <input
      style={{padding:'5px', borderRadius:'4px', border:'1px solid black', width:'100%', marginLeft:'5%'}}
        type="text"
        placeholder="Page ranges (1-3)"
        onChange={(e) => setSplitPages(e.target.value)}
      />
  </div>
  

      <div className="merge-btn"><button onClick={splitPdf}>Split PDF</button></div>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      {outputPdfUrls.length > 0 && (
        <div>
          {/* <span>Download</span> */}
          {outputPdfUrls.map((url, index) => (
            <div key={index} className="merge-btn" style={{marginBottom:'3%'}}>
              <a href={url} download={`split_${index + 1}.pdf`} style={{color:"white"}}>
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
