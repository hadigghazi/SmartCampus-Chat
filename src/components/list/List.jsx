import { useState } from "react";
import ChatList from "./chatList/ChatList";
import "./list.css";
import Userinfo from "./userInfo/Userinfo";

const List = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={`toggle-btn ${isOpen ? "open" : ""}`} onClick={toggleList}>
        {isOpen ? "✕" : <svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  style={{ marginTop: ".7rem" }}
  className="feather feather-user"
>
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>}
      </button>
      <div className={`list-container ${isOpen ? "open" : ""}`}>
        <div className="list">
          <Userinfo />
          <ChatList />
        </div>
      </div>
    </>
  );
};

export default List;
