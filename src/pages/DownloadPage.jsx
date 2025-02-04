import React from "react";
import { useSelector } from "react-redux";

const DownloadPage = () => {
  /*Gets audios from voicesSlice audios, an Array Object*/
  const audios = useSelector((state) => state.voices.audios);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Downloads</h1>
      <ul>
        {/*For each audio creates link to download*/}
        {audios.map((audio, index) => (
          <li key={index} className="mb-2">
            <a href={audio.url} download={audio.name}  className="text-white-500 transition-colors duration-300 hover:text-pink-500">
              {audio.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;
