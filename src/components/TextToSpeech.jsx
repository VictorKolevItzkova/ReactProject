import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAudio } from "../redux/voicesSlice";
import { TextContext } from "../context/TextContext";
import { useNavigate } from "react-router-dom";

const TextToSpeech = () => {
  const { text } = useContext(TextContext);
  const selectedVoice = useSelector((state) => state.voices.selectedVoice);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // To track if audio is playing
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0); // Track progress
  const [duration, setDuration] = useState(0); // Track total duration of the audio
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGenerateAudio = async () => {
    setIsLoading(true);
    if (!selectedVoice || !selectedVoice.voice_id) {
      console.log("No voice selected. Redirecting to Voice Library...");
      navigate("/library"); // Redirects to VoiceLibrary
      return;
    }

    if (!text.trim()) {
      return;
    }

    /*Calls API to get the audio*/
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.voice_id}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": "sk_11c30be504fa2c7597853f01a4f4374a09702854f8714699",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const blob = await response.blob();
      /*Creates URL object, adds it to the Redux*/
      const url = URL.createObjectURL(blob);
      const truncatedText = text.trim().slice(0, 10).replace(/\s+/g, "_")
      dispatch(addAudio({ name: `Audio_${selectedVoice.name}_${truncatedText}_${Date.now()}`, url }));
      const audio = new Audio(url);
      setAudio(audio); // Store the audio instance
      setIsPlaying(false);

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
    } catch (error) {
      console.error("Failed to generate audio", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Play the generated audio
  const handlePlayAudio = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
      setProgress(0);
    }
  };

  // Stop the audio
  const handleStopAudio = () => {
    if (audio) {
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset audio to the beginning
      setIsPlaying(false); // Set playing state to false
      setProgress(0);
    }
  };

  const handleProgressChange = (event) => {
    const newProgress = parseFloat(event.target.value);
    if (audio) {
      audio.currentTime = newProgress; // Set the audio to the new time
    }
    setProgress(newProgress); // Update the progress state
  };

  useEffect(() => {
    if (audio) {
      const handleTimeUpdate = () => {
        setProgress(audio.currentTime);
      };
      audio.addEventListener("timeupdate", handleTimeUpdate);

      // Clean up the event listener when the component unmounts or audio changes
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audio]);

  return (
    <>
      <div className="flex justify-center gap-4 w-3/5">
        <button
          onClick={handleGenerateAudio}
          className="w-1/2 p-3 bg-blue-500 text-white rounded text-center"
        >
          {isLoading ? "Generating..." : "Generate Audio"}
        </button>

        <button
          onClick={handlePlayAudio}
          disabled={!audio || isPlaying}
          className="w-1/2 p-3 bg-green-500 text-white rounded text-center disabled:opacity-50"
        >
          {isPlaying ? "Playing..." : "Play Audio"}
        </button>

        <button
          onClick={handleStopAudio}
          disabled={!audio || !isPlaying}
          className="w-1/2 p-3 bg-red-500 text-white rounded text-center disabled:opacity-50"
        >
          Stop Audio
        </button>
      </div>

      <div className="w-3/5 mt-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleProgressChange} // Handler for range changes
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>{(progress).toFixed(1)}s</span>
          <span>{(duration).toFixed(1)}s</span>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
