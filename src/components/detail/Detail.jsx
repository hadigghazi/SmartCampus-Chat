import { useState } from "react";
import "./detail.css";

const Detail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetail = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-detail-btn" onClick={toggleDetail}>
        {isOpen ? "✕" : "☰"}
      </button>
      <div className={`detail ${isOpen ? "open" : ""}`}>
      </div>
    </>
  );
};

export default Detail;
