import { useEffect, useRef, useState } from "react";
import "./chat.css";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
import upload from "../../lib/upload";

const [img, setImg] = useState({ file: null, url: "" });

const handleEmoji = (e) => {
  setText((prev) => prev + e.emoji);
  setOpen(false);
};

const handleImg = (e) => {
  if (e.target.files[0]) {
    setImg({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  }
};


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
