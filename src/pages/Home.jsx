import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextContext } from "../context/TextContext";
import TextToSpeech from "../components/TextToSpeech";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { text, setText } = useContext(TextContext);
  const navigate = useNavigate();
  /*Gets JSON object of voice, main parameters voice_id and name*/
  const selectedVoice = useSelector((state) => state.voices.selectedVoice);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-blue-700 text-white min-h-screen">
      <h1 className="text-3xl font-bold">Text-to-Speech Converter</h1>
      <textarea
        className="w-3/4 p-2 border rounded black"
        rows="6"
        placeholder="Enter text here..."
        value={text}
        /*Updates text when it changes*/
        onChange={(e) => setText(e.target.value)}
      />
      <div className="w-full flex justify-center">
        <ul className="w-3/4">
          <li
            key={selectedVoice.voice_id}
            className="w-full p-6 border rounded cursor-pointer text-center bg-blue-700 text-white font-bold"
            onClick={() => navigate("/library")}
          >
            {selectedVoice.name} (Selected)
          </li>
        </ul>
      </div>
      <TextToSpeech />
    </div>
  );
};

export default Home;
