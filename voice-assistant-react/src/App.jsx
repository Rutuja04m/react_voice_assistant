import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import WaveAnimation from "./components/WaveAnimation";
import ControlButtons from "./components/ControlButtons";
import Header from "./components/Header";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState("en");
  const [useDocMode, setUseDocMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [paused, setPaused] = useState(false);

  const handleAsk = async () => {
    const response = await axios.post("http://localhost:8000/ask", {
      useDocMode,
      lang,
    });
    const { question, answer } = response.data;
    setHistory(prev => [...prev, [question, answer]]);
  };

  const handleStop = async () => {
    setPaused(!paused);
    await axios.post("http://localhost:8000/stop");
  };

  const handleClear = () => setHistory([]);

  const handleEnd = () => alert("Conversation ended. You may now close the app.");

  return (
    <div className="flex">
      <Sidebar {...{ setFile, lang, setLang, useDocMode, setUseDocMode }} />
      <div className="flex-1 p-6 bg-[#0e1117] text-white">
        <Header />
        <WaveAnimation />
        <ChatBox history={history} />
        <ControlButtons onAsk={handleAsk} onStop={handleStop} onClear={handleClear} onEnd={handleEnd} />
      </div>
    </div>
  );
}

export default App;
