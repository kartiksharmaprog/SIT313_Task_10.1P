import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function signupHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        lastName,
        email
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={signupHandler}>
        <input
          type="text"
          value={name}
          placeholder="First Name"
          onChange={function(e) { setName(e.target.value); }}
          required
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={function(e) { setLastName(e.target.value); }}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={function(e) { setEmail(e.target.value); }}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={function(e) { setPassword(e.target.value); }}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={function(e) { setConfirmPassword(e.target.value); }}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default SignUp;