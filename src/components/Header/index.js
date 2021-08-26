import "./index.css";
import React from "react";
import { Button } from "antd";

const Header = ({ logout, user, login, authenticated }) => {
  return (
    <div className="header">
      <div>
        <p>GLAM URL Shortener</p>
      </div>
      <div className={authenticated ? "" : "fix-view-div"}>
        {authenticated ? (
          <>
            <p>
              Welcome <span className={`header-user-tab`}>{user}</span>
            </p>
            <Button className="logout-button" onClick={logout}>
              Sign out
            </Button>
          </>
        ) : (
          <Button className="login-button fix-view-button" onClick={login}>
            Sign in with AD
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
