import "./Main.css";
import React, { useState } from "react";
import axios from "axios";
import LinkOptions from "./LinkOptions";

const Main = ({ idToken, username, authenticated, setError }) => {
  const [shorten, setShorten] = useState(true);
  const [shortURL, setShortURL] = useState(null);
  const [options, setOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [linkOptions, setLinkOptions] = useState(false);
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [aliasAllowed, setAliasAllowed] = useState(true);
  const [urlTouched, setUrlTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [aliasError, setAliasError] = useState(false);
  const validateUrl = (value) =>
    /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(
      value
    );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticated) {
      setError("Please login to shorten URL");
      return;
    }
    if (shorten) {
      highlightErrorFields();
      return;
    }
    setLoading(true);
    setOptions(true);
    setShorten(true);
    try {
      const res = await axios({
        method: "POST",
        url: "/api/shortUrls",
        data: {
          full: url,
          password: password.length > 0 ? password : undefined,
          short: alias.length > 0 ? alias : undefined,
          idToken,
          username,
        },
      });
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        const {
          data: {
            shortUrl: { short },
          },
        } = res;
        setShortURL(window.location.href + short);
        setUrl("");
        setLinkOptions(false);
        setPasswordProtect(false);
        setPassword("");
        setAlias("");
      } else {
        const {
          data: { error },
        } = res;
        if (error === "shortURL already exists") {
          window.alert("Alias is already in use");
          setAlias("");
        } else {
          window.alert(error);
        }
        setShorten(false);
      }
      setLoading(false);
      setOptions(false);
    } catch (err) {
      window.alert("Something went wrong!");
      setShorten(false);
      setLoading(false);
      setOptions(false);
      console.log(err);
    }
  };
  const highlightErrorFields = () => {
    if (url.length === 0) {
      setUrlError(true);
    }
    if (linkOptions) {
      if (passwordProtect) {
        if (password.length === 0) {
          setPasswordError(true);
        }
      }
      if (alias.length > 0) {
        if (!aliasAllowed) {
          setAliasError(true);
        }
      }
    }
  };
  React.useEffect(() => {
    if (url.length > 0 && validateUrl(url)) {
      setUrlError(false);
      if (linkOptions) {
        if (passwordProtect) {
          if (password.length > 0 && aliasAllowed) {
            setPasswordError(false);
            setAliasError(false);
            setShorten(false);
          } else {
            if (password.length === 0) {
              if (passwordTouched) {
                setPasswordError(true);
              }
            }
            if (!aliasAllowed) {
              setAliasError(true);
            }
            setShorten(true);
          }
        } else if (aliasAllowed) {
          setPasswordError(false);
          setAliasError(false);
          setShorten(false);
        } else {
          setAliasError(true);
          setShorten(true);
        }
      } else {
        setPasswordError(false);
        setAliasError(false);
        setShorten(false);
      }
    } else {
      if (urlTouched) {
        setUrlError(true);
      }
      setShorten(true);
    }
  }, [
    url,
    linkOptions,
    passwordProtect,
    password,
    aliasAllowed,
    passwordTouched,
    urlTouched,
  ]);
  return (
    <div className="main">
      <p>GLAM URL Shortener</p>
      {shortURL ? (
        <div>
          <span style={{ marginRight: "0.5rem" }}>Short URL is </span>
          <a
            target="_blank"
            rel="noreferrer"
            href={shortURL}
            className="short-url"
          >
            {shortURL}
          </a>
        </div>
      ) : null}
      <div className="loader" style={{ display: loading ? "block" : "none" }}>
        <div className="loading"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={`url-input ${urlError ? "error" : ""}`}
          placeholder="http(s)://"
          value={url}
          onClick={() => setUrlTouched(true)}
          onChange={(e) => {
            if (!urlTouched) {
              setUrlTouched(true);
            }
            setUrl(e.target.value);
          }}
        />
        {!linkOptions ? null : (
          <LinkOptions
            passwordProtect={passwordProtect}
            setPasswordProtect={setPasswordProtect}
            password={password}
            setPassword={setPassword}
            alias={alias}
            setAlias={setAlias}
            loading={loading}
            aliasAllowed={aliasAllowed}
            setAliasAllowed={setAliasAllowed}
            passwordError={passwordError}
            aliasError={aliasError}
            passwordTouched={passwordTouched}
            setPasswordTouched={setPasswordTouched}
          />
        )}
        <div className="form-buttons">
          <button type="submit" className={shorten ? "disabled" : ""}>
            Shorten
          </button>
          <button
            type="button"
            onClick={() => {
              if (options) {
                return;
              }
              setLinkOptions((prev) => !prev);
            }}
            className={options ? "disabled" : ""}
          >
            Link Options
          </button>
        </div>
      </form>
      <p style={{ color: "#98978b", marginTop: "1rem", textAlign: "center" }}>
        Did you know you can change the URL ending by clicking on "Link
        Options"?
      </p>
    </div>
  );
};

export default Main;
