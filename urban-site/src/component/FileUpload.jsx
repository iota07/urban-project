import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

const FileUpload = ({ onFileContentRead }) => {
  const [fileName, setFileName] = useState(null);
  const fileReaderRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 52428800) {
        // 50MB limit
        alert("File is too large. Maximum size is 50MB.");
        return;
      }

      setFileName(file.name);

      fileReaderRef.current = new FileReader();
      fileReaderRef.current.onload = (event) => {
        onFileContentRead(file, event.target.result);
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
    <div className="file-upload flex flex-col justify-center">
      <div
        {...getRootProps({
          className:
            "dropzone flex items-center justify-center w-auto h-64 border-2 border-dashed border-primary rounded-lg cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <section className="flex flex-col items-center p-4">
          <IoCloudUploadOutline className="text-primary text-6xl md:text-8xl" />
          <p className="text-xl text-primary mt-4">
            Drag and Drop or click to Browse
          </p>
          <p className="text-md text-secondary mt-4">
            File type supported: .stl, Max size: 50MB
          </p>
        </section>
      </div>
    </div>
  );
};

export default FileUpload;
