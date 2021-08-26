import React from "react";
import { Modal, message } from "antd";
import axios from "axios";

const displaySuccess = (text) => {
  message.success(text);
};

const validateUrl = (value) =>
  /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(
    value
  );

const UrlEditModal = ({
  isModalVisible,
  setIsModalVisible,
  modalInfo,
  setError,
  urls,
  setUrls,
  accessToken,
  username,
}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    modalInfo ? modalInfo.full : ""
  );
  const handleSubmit = () => {
    if (inputValue.length > 0 && validateUrl(inputValue)) {
      setConfirmLoading(true);
      axios
        .patch("/api/url/shortUrls/long", {
          full: inputValue,
          accessToken,
          username,
          id: modalInfo?.key,
        })
        .then((res) => {
          if (res.status === 200) {
            const temp = [...urls];
            temp[modalInfo?.idx].full = inputValue;
            displaySuccess("Saved");
            setUrls(temp);
            setConfirmLoading(false);
            setIsModalVisible(false);
          } else {
            setError("Something went wrong! :(");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.data?.message) {
              setError(err.response.data.message);
            } else {
              setError("Something went wrong! :(");
            }
          }
        });
    } else {
      setError("Invalid URL entered");
      setConfirmLoading(false);
      setIsModalVisible(false);
    }
  };
  React.useEffect(() => {
    if (modalInfo) {
      setInputValue(modalInfo.full);
    }
  }, [modalInfo]);
  return (
    <Modal
      title="Edit Long URL"
      okText="Save"
      visible={isModalVisible}
      closeIcon={<h2 onClick={() => setIsModalVisible(false)}>&#10006;</h2>}
      confirmLoading={confirmLoading}
      onOk={handleSubmit}
      onCancel={() => setIsModalVisible(false)}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: "900", textAlign: "center" }}>
          Short URL :
          <span style={{ marginLeft: "1rem", fontWeight: "400" }}>
            {modalInfo?.short}
          </span>
        </p>
        <p style={{ fontWeight: "900", textAlign: "center" }}>
          Long URL :
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              marginLeft: "1rem",
              width: "60vw",
              fontWeight: "400",
              marginTop: "1rem",
            }}
          />
        </p>
      </div>
    </Modal>
  );
};

export default UrlEditModal;
