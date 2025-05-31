// components/ControlButtons.jsx
export default function ControlButtons({ onAsk, onStop, onClear, onEnd }) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button onClick={onAsk} className="bg-[#5abcd5] px-4 py-2 rounded">Ask</button>
      <button onClick={onStop} className="bg-[#5abcd5] px-4 py-2 rounded">Stop / Resume</button>
      <button onClick={onClear} className="bg-[#5abcd5] px-4 py-2 rounded">Clear History</button>
      <button onClick={onEnd} className="bg-[#5abcd5] px-4 py-2 rounded">End</button>
    </div>
  );
}

