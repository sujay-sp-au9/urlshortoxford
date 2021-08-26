import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  withRouter,
  Redirect,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { message, Menu } from "antd";
import { PublicClientApplication } from "@azure/msal-browser";
import QRCode from "react-qr-code";
import Header from "./Header";
import Main from "./Main";
import List from "./List";
import config from "./config";

const displayError = (err) => {
  message.error(err);
};

const App = ({ location }) => {
  let loginTimeoutID = null;
  const [current, SetCurrent] = useState("home");
  const [authenticated, setAuthenticated] = useState(true);
  const [firstAuthCheck, setFirstAuthCheck] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [shortURL, setShortURL] = useState(null);
  const { path, url } = useRouteMatch();
  const routerHistory = useHistory();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    if (pathArray.length === 2) {
      SetCurrent("home");
    } else if (pathArray[2] === "about") {
      SetCurrent("about");
    } else if (pathArray[2] === "links") {
      SetCurrent("links");
    } else if (pathArray[2] === "admin") {
      SetCurrent("admin");
    } else {
      SetCurrent("home");
    }
  }, [location]);
  useEffect(() => {
    if (!localStorage.getItem("redirect")) {
      localStorage.setItem("redirect", location.pathname);
    } else if (location.pathname.length > 28) {
      localStorage.setItem("redirect", location.pathname);
    }
    if (window.innerWidth < 768) {
      setMobileMode(true);
    } else {
      setMobileMode(false);
    }
    const windowResizeEventListener = window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setMobileMode(true);
      } else {
        setMobileMode(false);
      }
    });
    const accessToken = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("username");
    const name = localStorage.getItem("name");
    if (accessToken && username && name && !firstAuthCheck) {
      axios
        .post("/api/authenticate", { accessToken, username })
        .then((res) => {
          if (res.status === 200) {
            setAuthenticated(true);
            if (res.data.admin) {
              setAdmin(true);
            }
            setUser(name);
            setAccessToken(accessToken);
            setUsername(username);
            setFirstAuthCheck(true);
            const redirect = localStorage.getItem("redirect");
            if (redirect) {
              routerHistory.push(redirect);
              localStorage.removeItem("redirect");
            }
          } else {
            setError("Something went wrong! :(");
          }
        })
        .catch((err) => {
          if (!firstAuthCheck) {
            setAuthenticated(false);
            setUser(null);
            setAccessToken(null);
            setUsername(null);
            setFirstAuthCheck(true);
            setAdmin(false);
            setShortURL(null);
          }
          if (err.response) {
            if (err.response.data?.message) {
              setError(err.response.data.message);
            } else {
              if (err.response) {
                if (err.response.data?.message) {
                  setError(err.response.data.message);
                } else {
                  setError("Something went wrong! :(");
                }
              }
            }
          }
          console.log(err);
        });
    } else {
      if (!firstAuthCheck) {
        setAuthenticated(false);
        setUser(null);
        setAccessToken(null);
        setUsername(null);
        setFirstAuthCheck(true);
        setAdmin(false);
        setShortURL(null);
      }
    }
    return () => {
      window.removeEventListener("resize", windowResizeEventListener);
    };
  }, [authenticated, location, firstAuthCheck, routerHistory]);

  useEffect(() => {
    if (error) {
      displayError(error);
      setError(null);
    }
  }, [error]);

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority,
    },
  });

  const login = () => {
    try {
      publicClientApplication
        .loginPopup({
          scopes: config.scopes,
          prompt: "select_account",
        })
        .then((res) => {
          loginTimeoutID = setTimeout(logout, 3599998);
          localStorage.setItem("name", res.account.name);
          localStorage.setItem("username", res.account.username);
          localStorage.setItem("accesstoken", res.idToken);
          setFirstAuthCheck(false);
        });
    } catch (err) {
      console.log(err);

      if (err.response) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong! :(");
        }
      }
    }
  };

  const logout = () => {
    try {
      publicClientApplication.logoutPopup().then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("username");
        localStorage.removeItem("redirect");
        clearTimeout(loginTimeoutID);
        setUser(null);
        setAuthenticated(false);
        setFirstAuthCheck(false);
        setAdmin(false);
        setAccessToken(null);
        setUsername(null);
        setShortURL(null);
        routerHistory.push("/glamurlshortenerapplication");
      });
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong! :(");
        }
      }
    }
  };

  return (
    <div>
      <div>
        <Header
          user={user}
          authenticated={authenticated}
          login={login}
          logout={logout}
        />
        <div className="menu-container">
          <Menu
            onClick={(e) => SetCurrent(e.key)}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ justifyContent: "center", width: "100%" }}
            theme="dark"
          >
            <Menu.Item key="home">
              <Link to={url}>Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to={`${url}/about`}>About</Link>
            </Menu.Item>
            {authenticated ? (
              <Menu.Item key="links">
                <Link to={`${url}/links`}>Links</Link>
              </Menu.Item>
            ) : null}
            {admin ? (
              <Menu.Item key="admin">
                <Link to={`${url}/admin`}>Admin</Link>
              </Menu.Item>
            ) : null}
          </Menu>
        </div>
        <Switch>
          <Route exact path={path}>
            <>
              <Main
                authenticated={authenticated}
                accessToken={accessToken}
                username={username}
                setError={setError}
                mobileMode={mobileMode}
                shortURL={shortURL}
                setShortURL={setShortURL}
              />
              {shortURL ? (
                <QRCode className="qr-code-app" value={shortURL} />
              ) : null}
            </>
          </Route>
          <Route exact path={`${path}/about`}>
            <div className="app-about">
              GLAM URL shortener is a minimalistic link shortening platform
              built by
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/sujay-sp-1a0bb8196"
              >
                {` Sujay`}
                <sup>SP</sup>
              </a>
            </div>
          </Route>
          <Route path={`${path}/links/:short?/:full?`}>
            {authenticated ? (
              <List
                accessToken={accessToken}
                username={username}
                setError={setError}
                mobileMode={mobileMode}
              />
            ) : (
              <Redirect to={path} />
            )}
          </Route>
          <Route path={`${path}/admin/:short?/:full?`}>
            {authenticated ? (
              admin ? (
                <List
                  accessToken={accessToken}
                  username={username}
                  setError={setError}
                  mobileMode={mobileMode}
                  Admin
                />
              ) : (
                <Redirect to={`${path}/links`} />
              )
            ) : (
              <Redirect to={path} />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
