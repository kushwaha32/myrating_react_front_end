import React, { useState, useEffect } from "react";
import moment from "moment";

const ConvertToTime = ({ createdAt }) => {
  const [timeString, setTimeString] = useState("");

  const now = moment().utc();
  const createdAtMilliseconds = moment(createdAt).utc().valueOf();
  const diff = now - createdAtMilliseconds;

  useEffect(() => {
    if (diff < 60 * 60 * 1000) {
      setTimeString(`${(diff / (60 * 1000)).toFixed(2)} minutes`);
    } else if (diff < 60 * 60 * 24 * 1000) {
      setTimeString(`${(diff / (60 * 60 * 1000)).toFixed(2)} hours`);
    } else if (diff < 60 * 60 * 24 * 30 * 1000) {
      setTimeString(`${(diff / (60 * 60 * 24 * 1000)).toFixed(2)} days`);
    } else if (diff < 60 * 60 * 24 * 30 * 12 * 1000) {
      setTimeString(`${(diff / (60 * 60 * 24 * 30 * 1000)).toFixed(2)} months`);
    } else {
      setTimeString(`${(diff / (60 * 60 * 24 * 30 * 12 * 1000)).toFixed(2)} years`);
    }
  }, [diff]);

  return <>{timeString}</>;
};

export default ConvertToTime;
