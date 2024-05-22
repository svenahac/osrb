import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useUserStore } from "../stores/user";

function UploadPage() {
  const userData = useUserStore((state) => state.userData);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "",
    description: "",
    filePath: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileExtension, setFileExtension] = useState("");
  const [downloadedFile, setDownloadedFile] = useState(null);

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

  const downloadFile = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("content")
        .download("390d9a5d-897d-45df-89f7-7908200c9511-akane22");

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setDownloadedFile(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const uploadFile = async () => {
    try {
      setUploading(true);
      const { file } = selectedFile;
      const filePath = `${userData.id}-${uploadForm.title}`;

      const { data, error } = await supabase.storage
        .from("content") // Replace with your bucket name
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      console.log("File uploaded successfully:", data);
      console.log("File extension:", fileExtension);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  async function createContent() {
    const { title, type, description } = uploadForm;
    try {
      const { data, error } = await supabase
        .from("content")
        .insert([
          {
            title,
            type,
            description,
            user_id: userData.id,
            file_path: `${userData.id}-${title}`,
          },
        ])
        .single();
      if (error) throw error;
    } catch (error) {
      console.error("Error inserting content:", error);
    }
  }

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setUploadForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-bg bg-center bg-cover">
      <Header />
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
                <CiImageOn size={50} className="text-gray-700" />
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
              name="title"
              onChange={handle_input_change}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Type</label>
            <select
              className="mt-1 p-2 border border-gray-300 bg-white rounded"
              name="type"
              onChange={handle_input_change}
              defaultValue={""}
            >
              <option value="" disabled>
                Select category...
              </option>
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
              name="description"
              onChange={handle_input_change}
            ></textarea>
          </div>

          <button
            onClick={() => {
              uploadFile();
              createContent();
            }}
            disabled={uploading}
            className={`mt-4 px-6 py-2 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 transition duration-300 self-end ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UploadPage;
