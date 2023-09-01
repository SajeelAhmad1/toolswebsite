import React, { useRef, useState } from 'react';
import axios from 'axios';

function PdfToExcelConverter() {
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
      const apiUrl = 'https://api.cloudmersive.com/convert/pdf/to/xlsx';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Apikey': apiKey,
        },
        responseType: 'blob', // Receive response as a binary blob
      });

      // Create a Blob from the API response
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      console.log('Download URL:', url); // Add this line for debugging

      setIsLoading(false);
    } catch (error) {
      console.error('Error converting PDF to Excel:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'converted-document.xlsx';
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
      <h2>PDF to Excel Converter</h2>
      <input type="file" accept=".pdf" ref={fileInputRef} />
      <button onClick={handleFileChange} disabled={isLoading}>
        Convert to Excel
      </button>
      {isLoading && <p>Converting...</p>}
      {downloadUrl && (
        <div>
          <button onClick={handleDownload}>Download Excel File</button>
        </div>
      )}
    </div>
  );
}

export default PdfToExcelConverter;
