import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import "./tools.css"

const fontStyles = [
  'Helvetica',
  'TimesRoman',
  'Courier',
  'Arial',
  'Georgia',
  'Verdana',
  'Tahoma',
  'Palatino',
  'Impact',
  'ComicSansMS',
];

function AddHeaderFooterToPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [headerText, setHeaderText] = useState('Your Header Text');
  const [footerText, setFooterText] = useState('Your Footer Text');
  const [positionHeader, setPositionHeader] = useState('Top');
  const [positionFooter, setPositionFooter] = useState('Bottom');
  const [alignmentHeader, setAlignmentHeader] = useState('Middle');
  const [alignmentFooter, setAlignmentFooter] = useState('Middle');
  const [headerFontName, setHeaderFontName] = useState('Helvetica');
  const [footerFontName, setFooterFontName] = useState('Helvetica');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const addHeaderFooterToPDF = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first.');
      return;
    }

    try {
      const pdfBytes = await fetch(URL.createObjectURL(pdfFile)).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();

        const headerX = width / 2;
        const footerX = width / 2;

        // Calculate Y positions based on selected position
        let headerY, footerY;
        switch (positionHeader) {
          case 'Top':
            headerY = height - 20;
            break;
          case 'Middle':
            headerY = height / 2;
            break;
          case 'Bottom':
            headerY = 20;
            break;
          default:
            headerY = height / 2;
            break;
        }

        switch (positionFooter) {
          case 'Top':
            footerY = height - 20;
            break;
          case 'Middle':
            footerY = height / 2;
            break;
          case 'Bottom':
            footerY = 20;
            break;
          default:
            footerY = height / 2;
            break;
        }

        // Calculate X positions based on selected alignment
        let headerXPos, footerXPos;
        switch (alignmentHeader) {
          case 'Left':
            headerXPos = 20;
            break;
          case 'Middle':
            headerXPos = headerX - 50;
            break;
          case 'Right':
            headerXPos = headerX +200;
            break;
          default:
            headerXPos = headerX;
            break;
        }

        switch (alignmentFooter) {
          case 'Left':
            footerXPos = 20;
            break;
          case 'Middle':
            footerXPos = footerX - 50;
            break;
          case 'Right':
            footerXPos = headerX +200;
            break;
          default:
            footerXPos = footerX;
            break;
        }

        // Get font objects based on font names
        const headerFont = await pdfDoc.embedFont(StandardFonts[headerFontName]);
        const footerFont = await pdfDoc.embedFont(StandardFonts[footerFontName]);

        // Add header
        page.drawText(headerText, {
          x: headerXPos,
          y: headerY,
          size: 12,
          font: headerFont,
          color: rgb(0, 0, 0),
        });

        // Add footer
        page.drawText(footerText, {
          x: footerXPos,
          y: footerY,
          size: 12,
          font: footerFont,
          color: rgb(0, 0, 0),
        });

        page.drawLine({
          start: { x: 0, y: height - 50 },
          end: { x: width, y: height - 50 },
          thickness: 2,
          color: rgb(0, 0, 0),
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'modified.pdf');
    } catch (error) {
      console.error('Error adding header and footer:', error);
      alert('An error occurred while adding header and footer.');
    }
  };

  return (
    <div className="add-header-footer-to-pdf">
      <h1 className='first-heading'>Add Header and Footer to PDF</h1>
      <p>Add header and footer on all PDF pages online, free and easy.</p>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <div>
        <label htmlFor="headerText">Header Text:</label>
        <input
          type="text"
          id="headerText"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="footerText">Footer Text:</label>
        <input
          type="text"
          id="footerText"
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="alignmentHeader">Header Alignment:</label>
        <select
          id="alignmentHeader"
          value={alignmentHeader}
          onChange={(e) => setAlignmentHeader(e.target.value)}
        >
          <option value="Left">Left</option>
          <option value="Middle">Middle</option>
          <option value="Right">Right</option>
        </select>
      </div>
      <div>
        <label htmlFor="alignmentFooter">Footer Alignment:</label>
        <select
          id="alignmentFooter"
          value={alignmentFooter}
          onChange={(e) => setAlignmentFooter(e.target.value)}
        >
          <option value="Left">Left</option>
          <option value="Middle">Middle</option>
          <option value="Right">Right</option>
        </select>
      </div>
      <button onClick={addHeaderFooterToPDF}>Add Header and Footer</button>
    </div>
  );
}

export default AddHeaderFooterToPDF;
