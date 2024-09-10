import { useState } from "react";
import "./login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.reload(); // Reload after successful login
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
  
    if (!username || !email || !password) {
      toast.warn("Please enter inputs!");
      setLoading(false);
      return;
    }
  
    if (!avatar.file) {
      toast.warn("Please upload an avatar!");
      setLoading(false);
      return;
    }
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form>
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <label htmlFor="file">
      <img src={avatar.url || "./avatar.png"} alt="" />
      Upload an image
    </label>
    <input
      type="file"
      id="file"
      style={{ display: "none" }}
      onChange={handleAvatar}
    />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
