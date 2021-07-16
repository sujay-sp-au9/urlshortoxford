import "./LinkOptions.css";
import React from "react";
import axios from "axios";

const LinkOptions = ({
  passwordProtect,
  setPasswordProtect,
  password,
  setPassword,
  alias,
  setAlias,
  loading,
  aliasAllowed,
  setAliasAllowed,
  passwordError,
  aliasError,
  passwordTouched,
  setPasswordTouched,
}) => {
  const [aliasDebounce, setAliasDebounce] = React.useState(alias);
  React.useEffect(() => {
    let timerID = setTimeout(() => {
      if (aliasDebounce.length > 0) {
        axios
          .get(`/api/short/${aliasDebounce}/exists`)
          .then(({ data: { exists } }) => {
            if (exists) {
              setAliasAllowed(false);
            } else {
              setAliasAllowed(true);
              setAlias(aliasDebounce);
            }
          })
          .catch((err) => {
            window.alert("Something went wrong");
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
  }, [aliasDebounce, setAlias, setAliasAllowed]);
  return (
    <div className="link-options">
      <p>Customize link</p>
      <div className="password-protect">
        <label className="container">
          Public
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
          Secret
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
          style={{ marginTop: "0px" }}
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
        <label>{window.location.href}</label>
        <input
          className={`app-input ${aliasError ? "error" : ""}`}
          placeholder="custom alias (optional)"
          value={aliasDebounce}
          onChange={(e) => setAliasDebounce(e.target.value)}
        />
        {aliasDebounce.length > 0 ? (
          <span className={aliasAllowed ? "available" : "notavailable"}>
            {aliasAllowed ? "Available" : "Not available"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default LinkOptions;
