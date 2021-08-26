import "./ClicksModal.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Modal, DatePicker, Empty } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";
import { WorldMap } from "react-svg-worldmap";

// const mapdata = [
//   { country: "cn", value: 1 }, // china
//   { country: "in", value: 1 }, // india
//   { country: "us", value: 2 }, // united states
//   { country: "id", value: 3 }, // indonesia
//   { country: "pk", value: 7 }, // pakistan
//   { country: "br", value: 0 }, // brazil
//   { country: "ng", value: 0 }, // nigeria
//   { country: "bd", value: 1 }, // bangladesh
//   { country: "ru", value: 1 }, // russia
//   { country: "mx", value: 1 }, // mexico
// ];

const ClicksModal = ({
  isModalVisible,
  modalInfo,
  setModalInfo,
  modalStartDate,
  setModalStartDate,
  modalEndDate,
  setModalEndDate,
  setError,
  mobileMode,
  Admin,
}) => {
  const [data, setData] = useState([]);
  const [barchartData, setBarchartData] = useState([]);
  const [piechartData, setPieChartData] = useState([]);
  const [worldmapData, setWorldmapData] = useState([]);
  const routerHistory = useHistory();
  useEffect(() => {
    const escapeButtonListener = () => {
      routerHistory.push(
        `/glamurlshortenerapplication/${Admin ? "admin" : "links"}`
      );
    };
    document.addEventListener("keydown", escapeButtonListener);
    return () => {
      document.removeEventListener("keydown", escapeButtonListener);
    };
  }, [setModalInfo, setModalEndDate, setModalStartDate, routerHistory, Admin]);
  useEffect(() => {
    if (modalInfo) {
      axios
        .get(`/api/url/short/clickdates/${modalInfo.short}`)
        .then(
          ({
            data: {
              shortUrl: { clicksDates },
            },
          }) => setData(clicksDates)
        )
        .catch((err) => {
          setError("Something went wrong :(");
          console.log(err);
        });
    }
  }, [modalInfo, setError]);
  useEffect(() => {
    if (data.length > 0) {
      const tempClicks = {};
      const tempReferrers = {};
      const tempLocations = {};
      data.forEach(({ date, referrer, location }) => {
        date = new Date(date);
        const dateinformat =
          ("00" + date.getDate()).slice(-2) +
          "/" +
          ("00" + (date.getMonth() + 1)).slice(-2) +
          "/" +
          date.getFullYear();
        const action = (date, referrer) => {
          if (tempClicks[date]) {
            tempClicks[date] = tempClicks[date] + 1;
          } else {
            tempClicks[date] = 1;
          }
          if (tempReferrers[referrer]) {
            tempReferrers[referrer] = tempReferrers[referrer] + 1;
          } else {
            tempReferrers[referrer] = 1;
          }
          if (tempLocations[location]) {
            tempLocations[location] = tempLocations[location] + 1;
          } else {
            tempLocations[location] = 1;
          }
        };
        if (modalStartDate && modalEndDate) {
          const modalStartDateFormat = modalStartDate.format("DD/MM/YYYY");
          const modalEndDateFormat = modalEndDate.format("DD/MM/YYYY");
          if (
            dateinformat >= modalStartDateFormat &&
            dateinformat <= modalEndDateFormat
          ) {
            action(dateinformat, referrer);
          }
        } else if (modalStartDate) {
          const modalStartDateFormat = modalStartDate.format("DD/MM/YYYY");
          if (dateinformat >= modalStartDateFormat) {
            action(dateinformat, referrer);
          }
        } else if (modalEndDate) {
          const modalEndDateFormat = modalEndDate.format("DD/MM/YYYY");
          if (dateinformat <= modalEndDateFormat) {
            action(dateinformat, referrer);
          }
        } else {
          action(dateinformat, referrer);
        }
      });
      let finalClicks = [];
      let finalReferrers = [];
      let finalLocations = [];
      Object.keys(tempClicks).forEach((key) => {
        finalClicks.push({ date: key, clicks: tempClicks[key] });
      });
      finalClicks = finalClicks.sort();
      Object.keys(tempReferrers).forEach((key) =>
        finalReferrers.push({
          name: key,
          value: tempReferrers[key],
        })
      );
      Object.keys(tempLocations).forEach((key) => {
        finalLocations.push({
          country: key,
          value: tempLocations[key],
        });
      });
      const batched = (final1, final2, final3) => {
        setBarchartData(final1);
        setPieChartData(final2);
        setWorldmapData(final3);
      };
      batched(finalClicks, finalReferrers, finalLocations);
    }
  }, [data, modalStartDate, modalEndDate]);
  return (
    <Modal
      title={`Clicks Stats${
        !mobileMode ? " (Press any key to close modal)" : ""
      }`}
      visible={isModalVisible}
      footer={null}
      closeIcon={
        <Link to={`/glamurlshortenerapplication/${Admin ? "admin" : "links"}`}>
          &#10006;
        </Link>
      }
    >
      <div className="modal-top-half">
        <div className="links">
          <p>
            Short Link :{" "}
            {
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  window.location.href.split("glamurlshortenerapplication")[0] +
                  modalInfo?.short
                }
              >
                {modalInfo?.short}
              </a>
            }
          </p>
          <p>
            Long Link :{" "}
            {
              <a target="_blank" rel="noreferrer" href={modalInfo?.full}>
                {modalInfo?.full.slice(0, mobileMode ? 40 : 50) + "..."}
              </a>
            }
          </p>
        </div>
        <div className="dates">
          <DatePicker
            placeholder="Start date"
            onChange={setModalStartDate}
            disabledDate={(d) => {
              if (modalEndDate) {
                return d > modalEndDate || d > Date.now();
              }
              return d > Date.now();
            }}
            value={modalStartDate}
            style={{ marginBottom: "1rem" }}
          />
          <DatePicker
            placeholder="End date"
            onChange={setModalEndDate}
            disabledDate={(d) => {
              if (modalStartDate) {
                return d > Date.now() || d < modalStartDate;
              }
              return d > Date.now();
            }}
            value={modalEndDate}
          />
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <div className="modal-bottom-half">
            <div>
              <h3 className="graph-label">Traffic over time</h3>
              <BarChart
                width={mobileMode ? 350 : 500}
                height={280}
                data={barchartData}
              >
                <XAxis dataKey="date" />
                <YAxis dataKey="clicks" />
                <Tooltip />
                <Bar dataKey="clicks" fill="#3E3F3A" />
              </BarChart>
            </div>
            <div>
              <h3 className="graph-label">Traffic sources</h3>
              <PieChart width={400} height={250}>
                <Pie
                  data={piechartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3E3F3A"
                />
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <div className="modal-world-map">
            {worldmapData.length > 0 ? (
              <WorldMap
                color="#3E3F3A"
                title="Traffic sources categorized by countries"
                size="xl"
                data={worldmapData}
                frame={true}
              />
            ) : (
              <Empty style={{ marginTop: "2rem" }} />
            )}
          </div>
        </>
      ) : (
        <Empty style={{ marginTop: "2rem" }} />
      )}
    </Modal>
  );
};

export default ClicksModal;
