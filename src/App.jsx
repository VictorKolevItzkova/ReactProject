/*Import Router*/
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/*Import Redux*/
import { Provider } from "react-redux";
import store from "./redux/store";

/*Import Context*/
import { TextProvider } from "./context/TextContext";

/*Import components*/
import TextToSpeech from "./components/TextToSpeech";
import VoiceLibrary from "./pages/VoiceLibrary";
import DownloadPage from "./pages/DownloadPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <Provider store={store}>
      <TextProvider>
        <Router>
          <div className="min-h-screen bg-blue-700 text-white">
            <nav className="flex justify-center gap-6 py-4 bg-blue-800">
              <Link to="/" className="text-lg font-bold hover:underline">
                Home
              </Link>
              <Link to="/library" className="text-lg font-bold hover:underline">
                Voice Library
              </Link>
              <Link to="/downloads" className="text-lg font-bold hover:underline">
                Downloads
              </Link>
            </nav>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<VoiceLibrary />} />
                <Route path="/downloads" element={<DownloadPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TextProvider>
    </Provider>
  );
};

export default App;
