
import React from 'react';

export default function Sidebar({ setFile, lang, setLang, useDocMode, setUseDocMode }) {
  return (
    <aside className="bg-[#0e1117] text-white p-4 w-72">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Upload Document</h2>

      <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
      
      <label className="block mt-4">Language:</label>
      <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-black p-1 mt-1">
        <option value="en">English</option>
        <option value="mr">Marathi</option>
        <option value="hi">Hindi</option>
        <option value="gu">Gujarati</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
      </select>

      <div className="mt-4">
        <label className="flex items-center">
          <input type="checkbox" checked={useDocMode} onChange={() => setUseDocMode(!useDocMode)} />
          <span className="ml-2">Use Uploaded Document</span>
        </label>
      </div>
    </aside>
  );
}
