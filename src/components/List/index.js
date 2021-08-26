import "./index.css";
import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Button,
  Popconfirm,
  Input,
  Select,
  Radio,
  Tooltip,
  message,
  Spin,
} from "antd";
import ClicksModal from "./ClicksModal";
import UrlEditModal from "./UrlEditModal";

const { Option } = Select;

const displaySuccess = (text) => {
  message.success(text);
};

const List = ({ username, accessToken, setError, mobileMode, Admin }) => {
  const [urls, setUrls] = useState([]);
  const [refreshUrls, setRefreshUrls] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [disabledDelete, setDisabledDelete] = useState(false);
  const [disabledDisable, setDisabledDisable] = useState(false);
  const [disabledEnable, setDisabledEnable] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [pageNumber, SetPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("latest");
  const [filter, setFilter] = useState(3);
  const [modalInfo, setModalInfo] = useState(null);
  const [modalStartDate, setModalStartDate] = useState(null);
  const [modalEndDate, setModalEndDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullUrlModalVisible, setFullUrlModalVisible] = useState(false);
  const [fullUrlModalInfo, setFullUrlModalInfo] = useState(null);
  const { url } = useRouteMatch();
  const { short, full } = useParams();

  const columns = [
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (d) => {
        const date = new Date(d);
        return (
          <p>
            {("00" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              ("00" + date.getDate()).slice(-2) +
              "/" +
              date.getFullYear() +
              " " +
              ("00" + date.getHours()).slice(-2) +
              ":" +
              ("00" + date.getMinutes()).slice(-2) +
              ":" +
              ("00" + date.getSeconds()).slice(-2)}
          </p>
        );
      },
    },
    {
      title: "Short URL",
      dataIndex: "short",
      render: (short, { idx }) => (
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              const temp = [...urls];
              temp[idx] = {
                ...temp[idx],
                clicks: temp[idx].clicks + 1,
              };
              setUrls(temp);
            }}
            href={
              window.location.href.split("glamurlshortenerapplication")[0] +
              short
            }
          >
            {short}
          </a>
          <span
            className="copy-button-list"
            onClick={() => {
              var fullLink = document.createElement("input");
              document.body.appendChild(fullLink);
              fullLink.value =
                window.location.href.split("glamurlshortenerapplication")[0] +
                short;
              fullLink.select();
              document.execCommand("copy", false);
              fullLink.remove();
              displaySuccess("Copied");
            }}
          >
            Copy
          </span>
        </p>
      ),
    },
    {
      title: "Long URL",
      dataIndex: "full",
      render: (full, { idx, key, short }) => (
        <p>
          <a target="_blank" rel="noreferrer" href={full}>
            {full.slice(0, 50) + "..."}
          </a>
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => {
              setFullUrlModalInfo({
                key,
                idx,
                full,
                short,
              });
              setFullUrlModalVisible(true);
            }}
          >
            &#9998;
          </span>
        </p>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      render: (clicks, { short, full }) => (
        <Link to={`${url}/${short}/${full.replace(/\//g, "-")}`}>
          {clicks} &#x1F4C8;
        </Link>
      ),
    },
    {
      title: "Protected",
      dataIndex: "password",
      render: (password) =>
        password ? (
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? password : <span>&#x1F512;</span>}
          </p>
        ) : (
          <h3>--</h3>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (status ? <p>Enabled</p> : <p>Disabled</p>),
    },
  ];

  if (Admin) {
    columns.splice(1, 0, {
      title: "Created By",
      dataIndex: "user",
    });
  }

  useEffect(() => {
    SetPageNumber(1);
    setSelectedRows([]);
  }, [Admin]);

  useEffect(() => {
    if (short && full) {
      setModalInfo({ short, full: full.replace(/-/g, "/") });
      setModalStartDate(null);
      setModalEndDate(null);
    } else {
      setModalInfo(null);
      setModalStartDate(null);
      setModalEndDate(null);
    }
  }, [short, full]);

  useEffect(() => {
    if (accessToken && username) {
      const reqLink = Admin ? "/api/url/admin" : "/api/url";
      setTableLoading(true);
      axios
        .post(reqLink, {
          accessToken,
          username,
          pageNumber,
          search,
          sort,
          filter,
          pageSize,
        })
        .then((res) => {
          let finalList = [];
          res.data.shortUrls.forEach(
            (
              { short, full, clicks, _id, password, createdAt, status, user },
              idx
            ) => {
              finalList.push({
                short,
                full,
                clicks,
                key: _id,
                password,
                createdAt,
                status,
                idx,
                user,
              });
            }
          );
          setUrls(finalList);
          setTableLoading(false);
          const reqLink2 = Admin
            ? `/api/url/admin/shortUrls/count/${username}`
            : `/api/url/shortUrls/count/${username}`;
          axios
            .get(reqLink2)
            .then(({ data: { count } }) => setCount(count))
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
    }
  }, [
    username,
    accessToken,
    setError,
    pageNumber,
    search,
    filter,
    sort,
    refreshUrls,
    pageSize,
    Admin,
  ]);

  useEffect(() => {
    const batched = () => {
      setSearch(searchDebounce);
      SetPageNumber(1);
    };
    const timerID = setTimeout(batched, 1000);
    return () => clearTimeout(timerID);
  }, [searchDebounce]);

  useEffect(() => {
    if (modalInfo) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [modalInfo]);

  const deleteUrlsFromList = () => {
    setLoading(true);
    setDisabledDisable(true);
    setDisabledEnable(true);
    const ids = [];
    selectedRows.forEach((key) => {
      ids.push(key);
    });
    axios
      .delete("/api/url/shortUrls", { data: { accessToken, username, ids } })
      .then(() => {
        displaySuccess("Deleted");
        setLoading(false);
        setDisabledDisable(false);
        setDisabledEnable(false);
        SetPageNumber(1);
        setSelectedRows([]);
        setRefreshUrls((prev) => !prev);
      })
      .catch((err) => {
        setSelectedRows([]);
        setLoading(false);
        setDisabledDisable(false);
        setDisabledEnable(false);
        setRefreshUrls((prev) => !prev);
        console.log(err);
        if (err.response) {
          if (err.response.data?.message) {
            setError(err.response.data.message);
          } else {
            setError("Something went wrong! :(");
          }
        }
      });
  };

  const changeStatusUrlsFromList = (status) => {
    setDisabledDelete(true);
    if (status) {
      setDisabledDisable(true);
      setLoading3(true);
    } else {
      setDisabledEnable(true);
      setLoading2(true);
    }
    const ids = [];
    selectedRows.forEach((key) => {
      const url = urls.find((url) => url.key === key);
      if (!(url.status === status)) {
        ids.push(key);
      }
    });
    axios
      .patch("/api/url/shortUrls", { accessToken, username, ids, status })
      .then(() => {
        displaySuccess(status ? "Enabled" : "Disabled");
        setLoading2(false);
        setDisabledDelete(false);
        setSelectedRows([]);
        if (status) {
          setDisabledDisable(false);
          setLoading3(false);
        } else {
          setDisabledEnable(false);
          setLoading2(false);
        }
        let temp = [...urls];
        temp = temp.map((url) => {
          if (ids.some((key) => url.key === key)) {
            return { ...url, status };
          } else return url;
        });
        setUrls(temp);
      })
      .catch((err) => {
        setSelectedRows([]);
        setLoading2(false);
        setDisabledDelete(false);
        if (status) {
          setDisabledDisable(false);
          setLoading3(false);
        } else {
          setDisabledEnable(false);
          setLoading2(false);
        }
        console.log(err);
        if (err.response) {
          if (err.response.data?.message) {
            setError(err.response.data.message);
          } else {
            setError("Something went wrong! :(");
          }
        }
      });
  };

  const deleteAllUrls = () => {
    setLoading1(true);
    const reqLink = Admin
      ? "/api/url/admin/shortUrls/all"
      : "/api/url/shortUrls/all";
    axios
      .delete(reqLink, { data: { accessToken, username } })
      .then(() => {
        setUrls([]);
        setCount(0);
        setLoading(false);
        SetPageNumber(1);
        setRefreshUrls((prev) => !prev);
      })
      .catch((err) => {
        setLoading1(false);
        console.log(err);
        if (err.response) {
          if (err.response.data?.message) {
            setError(err.response.data.message);
          } else {
            setError("Something went wrong! :(");
          }
        }
      });
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
    preserveSelectedRowKeys: false,
  };
  const hasSelected = selectedRows.length > 0;

  const checkChanges = () => {
    if (
      pageNumber === 1 &&
      pageSize === 10 &&
      sort === "latest" &&
      filter === 3
    ) {
      return true;
    }
    return false;
  };

  const resetDefaults = () => {
    SetPageNumber(1);
    setPageSize(10);
    setSort("latest");
    setFilter(3);
  };

  return (
    <>
      <ClicksModal
        isModalVisible={isModalVisible}
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        modalStartDate={modalStartDate}
        setModalStartDate={setModalStartDate}
        modalEndDate={modalEndDate}
        setModalEndDate={setModalEndDate}
        setError={setError}
        mobileMode={mobileMode}
        Admin={Admin}
      />
      <UrlEditModal
        isModalVisible={fullUrlModalVisible}
        setIsModalVisible={setFullUrlModalVisible}
        modalInfo={fullUrlModalInfo}
        setError={setError}
        urls={urls}
        setUrls={setUrls}
        accessToken={accessToken}
        username={username}
      />
      <div className="list-container">
        <p>Table of links generated by {Admin ? "others" : "you"}</p>
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <Popconfirm
              title="Are you sure to delete selected URLs?"
              onCancel={deleteUrlsFromList}
              okText="Cancel"
              cancelText="Delete"
            >
              <Button
                style={{ marginRight: "0.5rem" }}
                type="danger"
                disabled={!hasSelected || disabledDelete}
                loading={loading}
              >
                Delete
              </Button>
            </Popconfirm>
            {`  `}
            <Popconfirm
              title="Are you sure to disable selected URLs?"
              onCancel={() => changeStatusUrlsFromList(false)}
              okText="Cancel"
              cancelText="Disable"
            >
              <Button
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                type="danger"
                disabled={!hasSelected || disabledDisable}
                loading={loading2}
              >
                Disable
              </Button>
            </Popconfirm>
            {`  `}
            <Popconfirm
              title="Are you sure to enable selected URLs?"
              onCancel={() => changeStatusUrlsFromList(true)}
              okText="Cancel"
              cancelText="Enable"
            >
              <Button
                style={{ marginLeft: "0.5rem" }}
                type="primary"
                disabled={!hasSelected || disabledEnable}
                loading={loading3}
              >
                Enable
              </Button>
            </Popconfirm>
            <span style={{ marginLeft: 8, position: "relative", top: "5px" }}>
              {hasSelected ? `Selected ${selectedRows.length} items` : ""}
            </span>
          </div>
          <div>
            <Input
              placeholder="Search...."
              value={searchDebounce}
              onChange={(e) => setSearchDebounce(e.target.value)}
            />
          </div>
          <div>
            <Tooltip title="Sort by">
              <Select
                value={sort}
                onChange={(v) => {
                  SetPageNumber(1);
                  setSort(v);
                }}
              >
                <Option value="latest">Latest</Option>
                <Option value="oldest">Oldest</Option>
                <Option value="mostclicked">Most clicked</Option>
                <Option value="leastclicked">Least clicked</Option>
              </Select>
            </Tooltip>
            <Tooltip title="Link enabled/disabled filter">
              <Radio.Group
                onChange={(e) => {
                  SetPageNumber(1);
                  setFilter(e.target.value);
                }}
                value={filter}
              >
                <Radio value={1}>Enabled</Radio>
                <Radio value={2}>Disabled</Radio>
                <Radio value={3}>Both</Radio>
              </Radio.Group>
            </Tooltip>
          </div>
          <Button
            type="primary"
            disabled={checkChanges()}
            onClick={resetDefaults}
          >
            Reset defaults
          </Button>
        </div>
        {tableLoading ? (
          <div style={{ marginTop: "2rem" }}>
            <Spin />
          </div>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={urls}
            scroll={{ x: 1000 }}
            pagination={{
              current: pageNumber,
              total: count,
              onChange: SetPageNumber,
              position: ["topRight"],
              onShowSizeChange: setPageSize,
            }}
          />
        )}
        {count > 0 ? (
          <Popconfirm
            title="Are you sure to delete all URLs generated by you?"
            onCancel={deleteAllUrls}
            okText="Cancel"
            cancelText="Delete"
          >
            <Button
              style={{ margin: "1rem 0" }}
              type="danger"
              loading={loading1}
            >
              Delete all {count} links generated by{" "}
              {Admin ? "other users" : "you"}
            </Button>
          </Popconfirm>
        ) : null}
      </div>
    </>
  );
};

export default List;
