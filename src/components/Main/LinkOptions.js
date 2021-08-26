import "./LinkOptions.css";
import React from "react";
import axios from "axios";
import { Checkbox } from "antd";

const LinkOptions = ({
  passwordProtect,
  setPasswordProtect,
  password,
  setPassword,
  alias,
  setAlias,
  expire,
  setExpire,
  loading,
  aliasAllowed,
  setAliasAllowed,
  passwordError,
  aliasError,
  passwordTouched,
  setPasswordTouched,
  setError,
}) => {
  const [aliasDebounce, setAliasDebounce] = React.useState(alias);
  const [aliasAllowedText, setAliasAllowedText] = React.useState("Available");
  React.useEffect(() => {
    if (aliasDebounce.length > 0) {
      if (
        aliasDebounce.startsWith("api") ||
        aliasDebounce.startsWith("glamurlshortenerapplication")
      ) {
        setAliasAllowed(false);
        setAliasAllowedText("Not available");
        return;
      }
      setAliasAllowed(false);
      setAliasAllowedText("Checking");
    } else {
      setAliasAllowed(true);
    }
    let timerID = setTimeout(() => {
      if (aliasDebounce.length > 0) {
        axios
          .get(`/api/url/short/${aliasDebounce}/exists`)
          .then(({ data: { exists } }) => {
            if (exists) {
              setAliasAllowed(false);
              setAliasAllowedText("Not available");
            } else {
              setAliasAllowed(true);
              setAlias(aliasDebounce);
              setAliasAllowedText("Available");
            }
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.data?.message) {
                setError(err.response.data.message);
              } else {
                setError("Something went wrong! :(");
              }
            }
            setAlias("");
            setAliasDebounce("");
            setAliasAllowed(true);
            console.log(err);
          });
      } else {
        setAlias("");
        setAliasAllowed(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [aliasDebounce, setAlias, setAliasAllowed, setError]);
  return (
    <div className="link-options">
      <div className="password-protect">
        <label className="container">
          <div className={passwordProtect ? "not-selected" : "selected"}>
            Public
          </div>
          <input
            disabled={loading}
            type="radio"
            checked={!passwordProtect}
            onChange={() => {
              setPassword("");
              setPasswordTouched(false);
              setPasswordProtect(false);
            }}
            name="radio"
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          <div className={!passwordProtect ? "not-selected" : "selected"}>
            Secret
          </div>
          <input
            disabled={loading}
            type="radio"
            checked={passwordProtect}
            onChange={() => setPasswordProtect(true)}
            name="radio"
          />
          <span className="checkmark"></span>
        </label>
      </div>
      {passwordProtect ? (
        <input
          className={`app-input ${passwordError ? "error" : ""}`}
          style={{ marginTop: "0px", marginBottom: "1rem" }}
          placeholder="******** (required if secret is selected)"
          value={password}
          onClick={() => setPasswordTouched(true)}
          onChange={(e) => {
            if (!passwordTouched) {
              setPasswordTouched(true);
            }
            setPassword(e.target.value);
          }}
        />
      ) : null}
      <div className="alias">
        <label>
          {window.location.href.split("glamurlshortenerapplication")[0]}
        </label>
        <input
          className={`app-input ${aliasError ? "error" : ""}`}
          placeholder="custom alias (optional)"
          value={aliasDebounce}
          onChange={(e) => setAliasDebounce(e.target.value)}
        />
        {aliasDebounce.length > 0 ? (
          <span className={aliasAllowed ? "available" : "notavailable"}>
            {aliasAllowedText}
          </span>
        ) : null}
      </div>
      <div>
        <Checkbox
          checked={expire}
          onChange={(e) => setExpire(e.target.checked)}
          style={{ fontSize: "16px", marginTop: "1rem" }}
        >
          Auto expire in 7 days
        </Checkbox>
      </div>
    </div>
  );
};

export default LinkOptions;
