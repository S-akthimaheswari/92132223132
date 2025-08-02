import React, { useState } from "react";
import Logger from "../middleware/Logger";

const UrlShortener = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [customCode, setCustomCode] = useState("");

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const shortCode = customCode || generateShortCode();
    const validityMinutes = validity ? parseInt(validity) : 30;
    const expiry = Date.now() + validityMinutes * 60000;

    Logger("URL Shortened", { longUrl, shortCode, validityMinutes });

    onShorten({ longUrl, shortCode, expiry });
    setLongUrl("");
    setValidity("");
    setCustomCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-md rounded bg-white">
      <input
        type="url"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        className="border p-2 m-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 m-2">
        Shorten
      </button>
    </form>
  );
};

export default UrlShortener;