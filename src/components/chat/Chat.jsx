import { useEffect, useRef, useState } from "react";
import "./chat.css";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";


const Chat = () => {
  const [chat, setChat] = useState({ messages: [] });
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);
  
useEffect(() => {
  if (chatId) {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      if (res.exists()) {
        setChat(res.data());
      } else {
        setChat({ messages: [] });
      }
    });

    return () => {
      unSub();
    };
  }
}, [chatId]);

  return (
    <div className="chat">
      <div className="center">
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
      </div>
    </div>
  );
};

export default Chat;
