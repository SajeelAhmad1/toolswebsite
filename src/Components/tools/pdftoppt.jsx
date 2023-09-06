import React, { useRef, useState } from 'react';
import axios from 'axios';

function PdfToPowerpointConverter() {
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
      const apiUrl = 'https://api.cloudmersive.com/convert/pdf/to/pptx'; // Use the PDF to PowerPoint conversion endpoint

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Apikey': apiKey,
        },
        responseType: 'blob', // Receive response as a binary blob
      });

      // Create a Blob from the API response
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      setIsLoading(false);
    } catch (error) {
      console.error('Error converting PDF to PowerPoint:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'converted-presentation.pptx';
    a.style.display = 'none';

    // Append the "a" element to the body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>PDF to PowerPoint Converter</h2>
      <input type="file" accept=".pdf" ref={fileInputRef} />
      <button onClick={handleFileChange} disabled={isLoading}>
        Convert to PowerPoint
      </button>
      {isLoading && <p>Converting...</p>}
      {downloadUrl && (
        <div>
          <button onClick={handleDownload}>Download PowerPoint File</button>
        </div>
      )}
    </div>
  );
}

export default PdfToPowerpointConverter;
