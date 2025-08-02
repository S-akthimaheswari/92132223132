import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logger from "../middleware/Logger";

const RedirectHandler = ({ urls }) => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlData = urls.find((u) => u.shortCode === code);

    if (urlData) {
      if (Date.now() <= urlData.expiry) {
        Logger("Redirected", { shortCode: code, to: urlData.longUrl });
        window.location.href = urlData.longUrl;
      } else {
        alert("This link has expired!");
        navigate("/");
      }
    } else {
      alert("Invalid short URL!");
      navigate("/");
    }
  }, [code, urls, navigate]);

  return null;
};

export default RedirectHandler;