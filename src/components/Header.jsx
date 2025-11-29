import React, { useEffect, useState } from "react";
import { Menu, Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  }

  return (
    <Menu secondary style={{ padding: "1em" }}>
      <Menu.Item header>DEV@Deakin</Menu.Item>
      <h5>
        <span style={{ fontSize: "0.8em", marginLeft: "0.5em", color: "#888" }}>
          By Kartik Sharma
        </span>
      </h5>
      <Menu.Item>
        <Input icon="search" placeholder="Search..." />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="Home" as={Link} to="/home" />
        <Menu.Item name="Post" as={Link} to="/post" />
        <Menu.Item name="Find" as={Link} to="/find" />
        {/* ADD PLANS MENU ITEM */}
        <Menu.Item name="Plans" as={Link} to="/plans" />
        {user ? (
          <Menu.Item>
            <Button onClick={handleSignOut} basic>Sign Out</Button>
          </Menu.Item>
        ) : (
          <Menu.Item name="Login" as={Link} to="/login" />
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;