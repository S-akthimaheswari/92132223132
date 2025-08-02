import React from "react";
import { Link } from "react-router-dom";

const UrlList = ({ urls }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Shortened URLs</h3>
      <ul>
        {urls.map((item, idx) => (
          <li key={idx} className="border p-2 mt-2">
            <p>Original: {item.longUrl}</p>
            <p>
              Shortened: 
              <Link to={`/${item.shortCode}`} className="text-blue-500 ml-1">
                {window.location.origin}/{item.shortCode}
              </Link>
            </p>
            <p>Expires: {new Date(item.expiry).toLocaleTimeString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;