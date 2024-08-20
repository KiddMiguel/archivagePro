import React, { useState } from 'react';
import axios from 'axios';

const DashTest = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios.post('http://localhost:4000/files/upload', formData)
            .then(response => {
                setUploadMessage('File uploaded successfully');
                console.log(response.data);
            })
            .catch(error => {
                setUploadMessage('File upload failed');
                console.error(error);
            });
    };

    return (
        <div>
            <h3>Upload File</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            <p>{uploadMessage}</p>
        </div>
    );
};

export default DashTest;
