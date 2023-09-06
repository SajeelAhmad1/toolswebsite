import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import { useDropzone } from 'react-dropzone';

function JpgToPdfConverter() {
  const [pdf, setPdf] = useState(null);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of acceptedFiles) {
      const imageBytes = await fetch(URL.createObjectURL(file)).then((res) =>
        res.arrayBuffer()
      );
      const jpgImage = await pdfDoc.embedJpg(imageBytes);
      const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgImage.width,
        height: jpgImage.height,
      });
    }

    setPdf(await pdfDoc.save());
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg',
    multiple: true,
  });

  const downloadPdf = () => {
    if (pdf) {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      saveAs(blob, 'converted.pdf');
    }
  };

  return (
    <div className="jpg-to-pdf-converter">
      <h1>JPG to PDF Converter</h1>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop JPG images here or click to select files</p>
      </div>
      {pdf && (
        <div>
          <button onClick={downloadPdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default JpgToPdfConverter;
