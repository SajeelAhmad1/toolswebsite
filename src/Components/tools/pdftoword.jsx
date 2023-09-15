import React, { useRef, useState } from 'react';
import axios from 'axios';
import "./tools.css"

function PdfToWordConverter() {
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
      const apiUrl = 'https://api.cloudmersive.com/convert/pdf/to/docx';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Apikey': apiKey,
        },
        responseType: 'blob', // Receive response as a binary blob
      });

      // Create a Blob from the API response
      const blob = new Blob([response.data], { type: 'application/msword' });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      setIsLoading(false);
    } catch (error) {
      console.error('Error converting PDF to Word:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'converted-document.docx';
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
      <h2 className='first-heading'>PDF to Word Converter</h2>
      <p>Convert your PDFs file into a editable word document easily within few clicks.</p>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      <div className="download-btn">
      <input type="file" accept=".pdf" ref={fileInputRef} />
      </div>
      <button className='merge-btn' onClick={handleFileChange} disabled={isLoading}>
        Convert to Word
      </button>
      {/* ad area */}
  <div className='ad-area'>

</div>
{/* ad area */}
      {isLoading && <p>Converting...</p>}
      {downloadUrl && (
        <div className='merge-btn'>
          <button onClick={handleDownload}>Download Word File</button>
        </div>
      )}
      
    </div>
  );
}

export default PdfToWordConverter;
