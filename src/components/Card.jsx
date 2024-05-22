import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Ensure the supabase client is correctly imported

function CardComponent(props){
  const [data, setData] = useState(null);

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

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data ? (
        data.map((item) => (
          <div
            key={item.id}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
          >
            <img className="w-full" src={item.image_url} alt={item.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">
                <span className="font-bold">{item.type}</span>{" "}
                {item.description}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CardComponent;
