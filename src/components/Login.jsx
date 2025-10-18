import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import "./FormStyles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleGoogleLogin() {
    var provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      setError("Google sign-in failed.");
    }
  }

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={loginHandler}>
          <div className="form-title">
            <span className="brand">DEV@Deakin</span>
            <Link
              to="/signup"
              className="link-btn"
              style={{ float: "right" }}
            >
              Sign up
            </Link>
          </div>

          <label>Your email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Your password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button
            type="button"
            className="primary-btn"
            style={{ marginTop: "10px", backgroundColor: "#4285F4", color: "#fff" }}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <button type="submit" className="primary-btn">
            Login
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;