import React, { useRef, useState } from 'react';
import axios from 'axios';
import "./tools.css"

function PowerPointToPdfConverter() {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = async () => {
    setIsLoading(true);

    try {
      const file = fileInputRef.current.files[0];

      // Create a FormData object to send the file to the Cloudmersive API
      const formData = new FormData();
      formData.append('file', file);

      // Replace 'YOUR_API_KEY' with your actual Cloudmersive API key
      const apiKey = '5b8fa830-0711-45f0-ba3c-477e13ae9a8d';
      const apiUrl = 'https://api.cloudmersive.com/convert/pptx/to/pdf'; // Use the PowerPoint to PDF conversion endpoint

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Apikey': apiKey,
        },
        responseType: 'blob', // Receive response as a binary blob
      });

      // Create a Blob from the API response
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      setIsLoading(false);
    } catch (error) {
      console.error('Error converting PowerPoint to PDF:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'converted-document.pdf';
    a.style.display = 'none';

    // Append the "a" element to the body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  };

  return (
    <div className='body'>
      <h2 className='first-heading'>PowerPoint to PDF Converter</h2>
      <p>Make a PDF file easily form PPT & PPTX slideshows within few clicks.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
<div className="download-btn">
      <input type="file" accept=".ppt, .pptx" ref={fileInputRef} /></div>
      <div className="merge-btn">
      <button onClick={handleFileChange} disabled={isLoading}>
        Convert to PDF
      </button></div>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      {isLoading && <p>Converting...</p>}
      {downloadUrl && (
        <div>
          <button onClick={handleDownload}>Download PDF File</button>
        </div>
      )}
    </div>
  );
}

export default PowerPointToPdfConverter;
