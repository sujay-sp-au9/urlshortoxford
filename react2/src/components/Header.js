import "./Header.css";
import React from "react";

const Header = ({ logout, user, login, authenticated }) => {
  return (
    <div className="header">
      <div>
        <p>GLAM URL Shortener</p>
        <p>ABOUT</p>
      </div>
      <div className={authenticated ? "" : "fix-view-div"}>
        {authenticated ? (
          <>
            <p>Welcome {user}</p>
            <button className="logout-button" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <button className="login-button fix-view-button" onClick={login}>
            Sign in with Azure
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
