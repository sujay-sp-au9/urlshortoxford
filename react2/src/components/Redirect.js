import React, { useState, useEffect } from "react";
import axios from "axios";

const Redirect = () => {
  const [text, setText] = useState("Redirecting...");
  const [enablePasswordInput, setInput] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    axios
      .get(`/api/short/${window.location.pathname.slice(1)}`)
      .then(({ data: { shortUrl } }) => {
        if (typeof shortUrl === "string") {
          setInput(true);
        } else {
          window.location.href = shortUrl.full;
        }
      })
      .catch((err) => {
        console.log(err);
        setText("Not found");
      });
  }, []);
  const handleSubmit = (e) => {
    const action = () => {
      axios({
        method: "POST",
        url: `/api/short/${window.location.pathname.slice(1)}`,
        data: { password },
      })
        .then(({ data: { shortUrl } }) => {
          window.location.href = shortUrl.full;
        })
        .catch((err) => {
          console.log(err);
          setText("Not found or Password incorrect");
        });
    };
    if (e.key === "Enter") {
      action();
    } else if (!e.key) {
      action();
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>{text}</h1>
      {enablePasswordInput ? (
        <div style={{ display: "flex" }}>
          <input
            style={{
              padding: "1rem 2rem",
              textAlign: "center",
              fontSize: "1rem",
            }}
            placeholder="Enter Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            onKeyPress={handleSubmit}
          />
          <span
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            onClick={handleSubmit}
          >
            Go
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Redirect;
