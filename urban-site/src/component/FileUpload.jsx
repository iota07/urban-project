import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

const FileUpload = ({ onFileContentRead }) => {
  const [fileName, setFileName] = useState(null);
  const fileReaderRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 20971520) {
        // 20MB limit (20 * 1024 * 1024)
        alert("File is too large. Maximum size is 20MB.");
        return;
      }

      setFileName(file.name);

      fileReaderRef.current = new FileReader();
      fileReaderRef.current.onload = (event) => {
        onFileContentRead(event.target.result);
      };

      fileReaderRef.current.readAsDataURL(file);
    },
    [onFileContentRead]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "model/stl": [".stl"] }, // Accept STL file extensions
    maxFiles: 1,
  });

  useEffect(() => {
    const cleanup = () => {
      // Dispose of the FileReader
      if (fileReaderRef.current) {
        fileReaderRef.current.onload = null;
        fileReaderRef.current = null;
      }
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  return (
    <div className="file-upload flex flex-col justify-center m-4">
      <div
        {...getRootProps({
          className:
            "dropzone my-2 p-8 flex items-center justify-center w-auto h-64 border-4 border-dashed border-tertiary rounded-lg cursor-pointer transition duration-300 ease-in-out hover:border-success hover:bg-danger",
        })}
      >
        <input {...getInputProps()} />
        <span className="flex items-center text-lg text-secondary p-8">
          <IoCloudUploadOutline className="mr-2 text-4xl" />
          Drag & drop a file here, or click to select a file
        </span>
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
