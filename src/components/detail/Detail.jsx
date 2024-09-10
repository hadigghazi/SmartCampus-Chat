import { useState } from "react";
import "./detail.css";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
  useChatStore();
const { currentUser } = useUserStore();

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
