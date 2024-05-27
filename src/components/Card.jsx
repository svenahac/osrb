import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function CardComponent(props) {
  const [downloadedFile, setDownloadedFile] = useState(null);
  const [dataType, setDataType] = useState(null);
  const data = props.data;

  useEffect(() => {
    downloadFile(props.data.file_path);
  }, []);

  const downloadFile = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("content")
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setDownloadedFile(url);
      setDataType(data.type);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  if (!dataType) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div
        key={data.id}
        className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
        style={{ width: "300px" }} // Set a fixed width for each card
      >
        <div className="aspect-w-16 aspect-h-9">
          {" "}
          {/* Maintain aspect ratio */}
          {dataType.startsWith("image/") ? (
            <img
              src={downloadedFile}
              alt="Selected"
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <object
                data={downloadedFile}
                type="application/pdf"
                width="100%"
                height="100%"
                className="border border-gray-300 rounded"
              >
                <p>
                  Your browser does not support PDFs. Please download the PDF to
                  view it.
                </p>
              </object>
            </div>
          )}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">
            <span className="font-bold">{data.type}</span> {data.description}
          </p>
        </div>
        <button className="mb-1 px-6 py-2 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 transition duration-300 self-end">
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}

export default CardComponent;
