import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";
import { auth, db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./userInfo.css";

const Userinfo = () => {
  const [isBlocked, setIsBlocked] = useState(false); // State to track blocking status
  const { currentUser } = useUserStore();
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      setIsBlocked(!isReceiverBlocked); // Toggle block status
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
        <div className="actions">
        <button className="action-btn block-btn" onClick={handleBlock}>
          <FontAwesomeIcon icon={faUserSlash} />
        </button>
        <button className="action-btn logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default Userinfo;
