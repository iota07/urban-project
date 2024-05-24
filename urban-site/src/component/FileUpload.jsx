import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileContentRead }) => {
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 20971520) {
        // 20MB limit (20 * 1024 * 1024)
        alert("File is too large. Maximum size is 20MB.");
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        onFileContentRead(event.target.result);
      };

      // Send the file data to an API endpoint
      /* fetch('https://your-api-endpoint.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileData: event.target.result })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    };*/
      reader.readAsDataURL(file);
    },
    [onFileContentRead]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".stl", // Accept CAD file extensions
    maxFiles: 1,
  });

  return (
    <div className="file-upload flex flex-col justify-center m-4">
      <div
        {...getRootProps({
          className:
            "dropzone my-2 p-8 flex items-center justify-center w-auto h-64 border-4 border-dashed border-tertiary rounded-lg cursor-pointer transition duration-300 ease-in-out hover:border-success hover:bg-danger",
        })}
      >
        <input {...getInputProps()} />
        <p className="text-lg text-secondary p-8">
          Drag 'n' drop a file here, or click to select a file
        </p>
      </div>
      {fileName && (
        <div className="file-details">
          <p>
            <strong>File Name:</strong> {fileName}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
