import React, { useState } from "react";

import { supabase } from "../supabase/supabase";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const [downloadedImage, setDownloadedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileExtension = file.name.split(".").pop();
      setFileType(fileType);
      setFileExtension(fileExtension);
      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile({ file, preview: reader.result });
        };
        reader.readAsDataURL(file);
      } else if (fileType === "application/pdf") {
        setSelectedFile({ file, preview: URL.createObjectURL(file) });
      } else {
        setSelectedFile(null);
      }
    }
  };

  const uploadFile = async () => {
    try {
      setUploading(true);
      const { file } = selectedFile;
      const filePath = `${Date.now()}-blabla`;

      const { data, error } = await supabase.storage
        .from("content") // Replace with your bucket name
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { publicURL, error: publicURLError } = supabase.storage
        .from("content") // Replace with your bucket name
        .getPublicUrl(filePath);

      if (publicURLError) {
        throw publicURLError;
      }

      setFileURL(publicURL);
      console.log("File URL:", publicURL);
      console.log("File uploaded successfully:", data);
      console.log("File extension:", fileExtension);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("content") // Replace with your bucket name
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setDownloadedImage(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="w-1/2 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 p-4 mr-4">
          {selectedFile ? (
            fileType.startsWith("image/") ? (
              <img
                src={selectedFile.preview}
                alt="Selected"
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <object
                  data={selectedFile.preview}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  className="border border-gray-300 rounded"
                >
                  <p>
                    Your browser does not support PDFs. Please download the PDF
                    to view it.
                  </p>
                </object>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                id="fileInput"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center justify-center h-full"
              >
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8m1 0a4 4 0 01-4 4H8a4 4 0 01-4-4m5-4h.01M11 12h.01M15 12h.01"
                  ></path>
                </svg>
                <p className="mt-2 text-gray-600">
                  Upload your image or pdf file
                </p>
              </label>
            </div>
          )}
        </div>
        <div className="w-1/2 flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Content title..."
              maxLength="180"
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Tags</label>
            <select className="mt-1 p-2 border border-gray-300 rounded">
              <option value="">Select category...</option>
              <option value="Map">Map</option>
              <option value="Monster">Monster</option>
              <option value="Magic Item">Magic Item</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Description</label>
            <textarea
              placeholder="You find yourself in a tavern..."
              maxLength="360"
              className="mt-1 p-2 border border-gray-300 rounded h-24 resize-none"
            ></textarea>
          </div>
          <button
            onClick={uploadFile}
            disabled={uploading}
            className={`mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 self-end ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
          {fileURL && (
            <div className="mt-4">
              <a
                href={fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Uploaded File
              </a>
              <button
                onClick={() => downloadFile(fileURL.split("/").pop())}
                className="mt-2 px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
              >
                Download and Display Image
              </button>
            </div>
          )}
          {downloadedImage && (
            <div className="mt-4">
              <img
                src={downloadedImage}
                alt="Downloaded"
                className="object-cover h-full w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
