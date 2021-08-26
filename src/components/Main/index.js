import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import LinkOptions from "./LinkOptions";

const Main = ({
  accessToken,
  username,
  authenticated,
  setError,
  mobileMode,
  shortURL,
  setShortURL,
}) => {
  const [shorten, setShorten] = useState(true);
  const [options, setOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [linkOptions, setLinkOptions] = useState(false);
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [aliasAllowed, setAliasAllowed] = useState(true);
  const [expire, setExpire] = useState(false);
  const [urlTouched, setUrlTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [aliasError, setAliasError] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
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
      const dataObj = {
        full: url,
        password: password.length > 0 ? password : undefined,
        short: alias.length > 0 ? alias : undefined,
        accessToken,
        username,
      };
      if (expire) {
        dataObj.state = true;
      }
      const res = await axios({
        method: "POST",
        url: "/api/url/shortUrls",
        data: dataObj,
      });
      if (res.status === 201 || res.status === 200) {
        const {
          data: {
            shortUrl: { short },
          },
        } = res;
        setCopyButtonText("Copy");
        setShortURL(
          window.location.href.split("glamurlshortenerapplication")[0] + short
        );
        setUrl("");
        setLinkOptions(false);
        setPasswordProtect(false);
        setPassword("");
        setAlias("");
        setExpire(false);
        setAliasAllowed(true);
        setUrlTouched(false);
        setPasswordTouched(false);
        setUrlError(false);
        setPasswordError(false);
        setAliasError(false);
      } else {
        const {
          data: { error },
        } = res;
        if (error === "shortURL already exists") {
          setError("Alias is already in use");
          setAlias("");
        } else {
          setError(error);
        }
        setShorten(false);
      }
      setLoading(false);
      setOptions(false);
    } catch (err) {
      if (err.response) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong! :(");
        }
      }
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
  useEffect(() => {
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
  useEffect(() => {
    if (!authenticated) {
      setCopyButtonText("Copy");
      setShortURL(null);
      setUrl("");
      setLinkOptions(false);
      setPasswordProtect(false);
      setPassword("");
      setAlias("");
      setAliasAllowed(true);
      setUrlTouched(false);
      setPasswordTouched(false);
      setUrlError(false);
      setPasswordError(false);
      setAliasError(false);
    }
  }, [authenticated, setShortURL]);
  useEffect(() => {
    return () => setShortURL(null);
  }, [setShortURL]);
  return (
    <div className="main">
      <p>GLAM URL Shortener</p>
      {shortURL ? (
        <div className="short-url">
          <span style={{ marginRight: "0.5rem" }}>Short URL is </span>
          <a
            style={{ wordBreak: "break-all" }}
            target="_blank"
            rel="noreferrer"
            href={shortURL}
          >
            {mobileMode ? shortURL.slice(0, 30) + "..." : shortURL}
          </a>
          <span
            className="copy-button"
            onClick={() => {
              var fullLink = document.createElement("input");
              document.body.appendChild(fullLink);
              fullLink.value = shortURL;
              fullLink.select();
              document.execCommand("copy", false);
              fullLink.remove();
              setCopyButtonText("Copied");
            }}
          >
            {copyButtonText}
          </span>
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
            expire={expire}
            setExpire={setExpire}
            loading={loading}
            aliasAllowed={aliasAllowed}
            setAliasAllowed={setAliasAllowed}
            passwordError={passwordError}
            aliasError={aliasError}
            passwordTouched={passwordTouched}
            setPasswordTouched={setPasswordTouched}
            setError={setError}
          />
        )}
        <div className="form-buttons">
          <Button
            type="submit"
            className={shorten ? "disabled" : ""}
            onClick={handleSubmit}
          >
            Shorten
          </Button>
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
            Customize
          </button>
        </div>
      </form>
    </div>
  );
};

export default Main;
