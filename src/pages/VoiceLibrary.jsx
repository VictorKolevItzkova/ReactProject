import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedVoice } from "../redux/voicesSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VoiceLibrary = () => {
  const [voices, setVoices] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedVoice = useSelector((state) => state.voices.selectedVoice);
  const apiKey = "sk_79914e0009cbdec3e7fe6a5247909ed742cb46ac1c2e2660";  // API of ElevenLabs

  /*Execute when API changes*/
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices", {
          method: "GET",
          headers: {
            "xi-api-key": apiKey,  // Authentication with API
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch voices");
        }
        
        const data = await response.json();
        setVoices(data.voices.slice(0, 10)); // Limit first 10 voices
      } catch (error) {
        console.error("Failed to fetch voices", error);
      }
    };

    fetchVoices();
  }, [apiKey]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Voice Library</h1>
      <ul className="grid grid-cols-2 gap-4">
        {voices.map((voice) => (
            
          <li
            key={voice.voice_id}
            className={`p-4 border rounded cursor-pointer ${
              selectedVoice?.voice_id === voice.voice_id
                ? "bg-blue-700 text-white font-bold"
                : "hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => {
              dispatch(setSelectedVoice(voice))
              navigate("/")
            }}
          >
            {voice.name} {selectedVoice?.voice_id === voice.voice_id && "(Selected)"}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default VoiceLibrary;
