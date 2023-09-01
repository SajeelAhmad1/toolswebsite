import React, { useRef, useState } from 'react';
import axios from 'axios';

function PdfToJpgConverter() {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState([]);

  const handleFileChange = async () => {
    setIsLoading(true);

    try {
      const file = fileInputRef.current.files[0];

      // Create a FormData object to send the file to the Cloudmersive API
      const formData = new FormData();
      formData.append('file', file);

      // Replace 'YOUR_API_KEY' with your actual Cloudmersive API key
      const apiKey = '5b8fa830-0711-45f0-ba3c-477e13ae9a8d';
      const apiUrl = 'https://api.cloudmersive.com/convert/pdf/to/jpg';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Apikey': apiKey,
        },
      });

      // The response data contains an array of image URLs
      const imageUrls = response.data;

      setDownloadUrls(imageUrls);
      setIsLoading(false);
    } catch (error) {
      console.error('Error converting PDF to JPG:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>PDF to JPG Converter</h2>
      <input type="file" accept=".pdf" ref={fileInputRef} />
      <button onClick={handleFileChange} disabled={isLoading}>
        Convert to JPG
      </button>
      {isLoading && <p>Converting...</p>}
      {downloadUrls.length > 0 && (
        <div>
          <h3>Download Images:</h3>
          {downloadUrls.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Page ${index + 1}`} />
              <a href={imageUrl} download={`page-${index + 1}.jpg`}>
                Download Page {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PdfToJpgConverter;
