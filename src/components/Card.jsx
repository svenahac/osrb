import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function CardComponent(props) {
  const [downloadedFile, setDownloadedFile] = useState(null);
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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div
        key={data.id}
        className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
      >
        <img className="w-full" src={downloadedFile} alt={data.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">
            <span className="font-bold">{data.type}</span> {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
