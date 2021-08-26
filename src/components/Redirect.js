import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

const Redirect = () => {
  const [text, setText] = useState("Redirecting...");
  const [enablePasswordInput, setInput] = useState(false);
  const [password, setPassword] = useState("");
  const [country_code] = useState({ code: "" });
  const { shortUrl } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://freegeoip.app/json/${document.getElementById("gfg").innerText}`
      )
      .then((res) => {
        country_code.code = res.data.country_code;
        axios
          .get(
            `/api/url/short/${shortUrl}?referrer=${document.referrer}&location=${res.data.country_code}`
          )
          .then(({ data: { shortUrl } }) => {
            if (
              typeof shortUrl === "string" &&
              shortUrl === "password protected"
            ) {
              setInput(true);
            } else if (
              typeof shortUrl === "string" &&
              shortUrl === "disabled"
            ) {
              setText("Link Disabled");
            } else {
              window.location.href = shortUrl.full;
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              if (err.response.data?.message) {
                setText(err.response.data.message);
              } else {
                setText("Something went wrong! :(");
              }
            }
          });
      })
      .catch((err) => {
        setText("Something went wrong! :(");
        console.log(err);
      });
  }, [shortUrl, country_code]);
  const handleSubmit = (e) => {
    const action = () => {
      axios({
        method: "POST",
        url: `/api/url/short/${shortUrl}?referrer=${document.referrer}&location=${country_code.code}`,
        data: { password },
      })
        .then(({ data: { shortUrl } }) => {
          window.location.href = shortUrl.full;
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.data?.message) {
              setText(err.response.data.message);
            } else {
              setText("Something went wrong! :(");
            }
          }
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
      {enablePasswordInput ? (
        <p
          style={{
            fontSize: "5vw",
            marginBottom: "2rem",
            color: "white",
            width: "90vw",
            height: "100px",
            backgroundColor: "rgb(62, 63, 58)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          GLAM URL Shortener
        </p>
      ) : null}
      <h1 style={{ marginBottom: "2rem", color: "rgb(62, 63, 58)" }}>{text}</h1>
      {enablePasswordInput ? (
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <Button
            type="primary"
            style={{
              backgroundColor: "#29abe0",
              marginLeft: "1rem",
              width: "80px",
              height: "50px",
            }}
            onClick={handleSubmit}
          >
            Go
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Redirect;
