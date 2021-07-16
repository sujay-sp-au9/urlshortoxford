import "./App.css";
import React, { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import Header from "./Header";
import Main from "./Main";
import List from "./List";
import config from "./config";

const App = () => {
  let loginTimeoutID = null;
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    let timeoutID;
    if (error) {
      timeoutID = setTimeout(() => {
        setError(null);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [error]);

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
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
          loginTimeoutID = setTimeout(logout, 3600000);
          setUser(res.account.name);
          setIdToken(res.idToken);
          setUsername(res.account.username);
          setAuthenticated(true);
        });
    } catch (err) {
      console.log(err);
      setError("Something went wrong! :(");
    }
  };

  const logout = () => {
    try {
      publicClientApplication.logoutPopup().then((res) => {
        clearTimeout(loginTimeoutID);
        setUser(null);
        setAuthenticated(false);
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong! :(");
    }
  };

  // if (!authenticated) {
  //   return (
  //     <div className="login-page">
  //       <h1>
  //         URL shortner<sup> powered by OXFORD</sup>
  //       </h1>
  //       <div className="login-button" onClick={login}>
  //         <h3>Please log in</h3>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {error ? (
        <div className="alert">
          <strong>{error}</strong>
        </div>
      ) : null}
      <div className={error ? "blur" : ""}>
        <Header
          user={user}
          authenticated={authenticated}
          login={login}
          logout={logout}
        />
        <Main
          authenticated={authenticated}
          idToken={idToken}
          username={username}
          setError={setError}
        />
        {authenticated ? <List idToken={idToken} username={username} /> : null}
      </div>
    </div>
  );
};

export default App;
