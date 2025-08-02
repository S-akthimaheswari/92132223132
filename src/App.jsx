import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import './App.css';

const Logger = (msg, data = {}) => {
  const logs = JSON.parse(sessionStorage.getItem("logs") || "[]");
  logs.push({ time: new Date().toISOString(), msg, ...data });
  sessionStorage.setItem("logs", JSON.stringify(logs));
};

const UrlShortener = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const shortCode = code || Math.random().toString(36).substring(2, 7);
    const expiry = Date.now() + (validity ? parseInt(validity) : 30) * 60000;
    onShorten({ longUrl, shortCode, expiry });
    Logger("Shortened", { longUrl, shortCode });
    setLongUrl(""); setValidity(""); setCode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="url" placeholder="Long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required />
      <input placeholder="Custom code" value={code} onChange={(e) => setCode(e.target.value)} />
      <input type="number" placeholder="Validity (min)" value={validity} onChange={(e) => setValidity(e.target.value)} />
      <button type="submit">Shorten</button>
    </form>
  );
};

const UrlList = ({ urls }) => (
  <ul>
    {urls.map((u, i) => (
      <li key={i}>
        {u.longUrl} → <a href={`/${u.shortCode}`}>{window.location.origin}/{u.shortCode}</a>
      </li>
    ))}
  </ul>
);

const RedirectHandler = ({ urls }) => {
  const { code } = useParams();
  const nav = useNavigate();
  React.useEffect(() => {
    const url = urls.find(u => u.shortCode === code);
    if (url && Date.now() <= url.expiry) {
      Logger("Redirect", { code, to: url.longUrl });
      window.location.href = url.longUrl;
    } else {
      alert("Invalid or expired link"); nav("/");
    }
  }, [code, urls, nav]);
  return null;
};

export default function App() {
  const [urls, setUrls] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><h1>URL Shortener</h1><UrlShortener onShorten={(d) => setUrls([...urls, d])} /><UrlList urls={urls} /></>} />
        <Route path="/:code" element={<RedirectHandler urls={urls} />} />
      </Routes>
    </Router>
  );
}
