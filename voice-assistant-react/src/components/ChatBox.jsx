// components/ChatBox.jsx
export default function ChatBox({ history }) {
  return (
    <div className="chat-box p-4 bg-white bg-opacity-5 backdrop-blur rounded-lg overflow-y-auto h-[400px]">
      {history.map(([q, r], idx) => (
        <div key={idx}>
          <div className="user-box bg-[#145da1] p-3 rounded mb-2 border-l-4 border-[#0a1b2c]">
            <strong>You:</strong><br />{q}
          </div>
          <div className="gemini-box bg-[#145da1] p-3 rounded mb-4 border-l-4 border-[#6c63ff]">
            <strong>Gemini:</strong><br />{r}
          </div>
        </div>
      ))}
    </div>
  );
}
