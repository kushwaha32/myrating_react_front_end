import React, { useEffect, useState } from "react";

const RangeOfOpenDays = ({ operationDay }) => {
  const [days, setDays] = useState([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]);
  const [closeDay, setCloseDay] = useState([]);
  const [openDay, setOpenDay] = useState([]);
  const [openTiming, setOpenTiming] = useState({ start: "", end: "" });

  const filterSameTDay = () => {
    const updatedOperationDay = { ...operationDay };

    const closeD = Object.keys(updatedOperationDay).filter((day) => {
      if (updatedOperationDay[day].close) {
        delete updatedOperationDay[day];
        return true;
      }
      return false;
    });
    setCloseDay(closeD);

    const groupedDays = {};

    for (const day in updatedOperationDay) {
      const { start, end } = updatedOperationDay[day];
      const key = `${start}-${end}`;

      if (!groupedDays[key]) {
        groupedDays[key] = [];
      }

      groupedDays[key].push(day);
    }
    // Convert the object into an array of objects
    const dataArray = Object.entries(groupedDays).map(([time, days]) => ({
      time,
      days,
    }));

    // Define a custom order for days of the week
    const dayOrder = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    // Sort the array based on the custom day order
    dataArray.sort((a, b) => {
      const dayA = dayOrder.indexOf(a.days[0]);
      const dayB = dayOrder.indexOf(b.days[0]);
      return dayA - dayB;
    });
    setOpenDay(dataArray);
  };

  useEffect(() => {
    filterSameTDay();
  }, []);

  return (
    <>
      {/* ///////////////////////////////////////////////////////////////////////////// */}
      {/* //////////////////----------- days of open  ------------///////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////////// */}
      {openDay?.map((curr) => (
        <>
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="25"
                viewBox="0 0 30.1 30.1"
                style={{ transform: "translateX(-4px)" }}
              >
                <path
                  id="Icon_awesome-thumbs-up"
                  data-name="Icon awesome-thumbs-up"
                  d="M10.847,11.86h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,9.932H9.192V25.1H5.881Zm4.966,0h3.311V25.1H10.847Zm4.966,0h3.311V25.1H15.813Zm-4.966-4.966h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,0H9.192v3.311H5.881Zm18.208-14.9V3.583H20.779V1.928H9.192V3.583H5.881V1.928H2.571V28.413H27.4V1.928H24.089Zm1.655,24.83H4.226V8.549H25.745Z"
                  fill="#037ca9"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b text-n-ab">
              {curr?.days?.length > 1
                ? `Open ${curr?.days?.[0]} to ${
                    curr?.days[curr?.days.length - 1]
                  }`
                : `Open ${curr?.days?.[0]}`}
              {/* Open Monday to Saturday,{" "} */}
              {/* <span className="ms-2">( Sunday - Closed )</span> */}
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////----------- Timing of opening -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 35.1 35.1"
                style={{ transform: "translateX(-4px)" }}
              >
                <path
                  id="Icon_awesome-thumbs-up"
                  data-name="Icon awesome-thumbs-up"
                  d="M17.546,3A14.561,14.561,0,1,0,32.121,17.561,14.553,14.553,0,0,0,17.546,3Zm.015,26.209A11.648,11.648,0,1,1,29.209,17.561,11.645,11.645,0,0,1,17.561,29.209Zm.728-18.929H16.1v8.736L23.749,23.6l1.092-1.791-6.552-3.888Z"
                  fill="#037ca9"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b text-n-ab">
              {`${curr?.time.split("-")[0].slice(5)} to ${curr?.time
                .split("-")[1]
                .slice(5)}`}
              {/* 10 AM to 05 PM */}
            </figcaption>
          </figure>
        </>
      ))}

      {/* ///////////////////////////////////////////////////////////////////////////// */}
      {/* //////////////////----------- days of Close  ------------//////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////////// */}

      <figure className="pro-img-lrt">
        <div className="pro-img-svg-w">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="25"
            viewBox="0 0 30.1 30.1"
            style={{ transform: "translateX(-4px)" }}
          >
            <path
              id="Icon_awesome-thumbs-up"
              data-name="Icon awesome-thumbs-up"
              d="M10.847,11.86h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,9.932H9.192V25.1H5.881Zm4.966,0h3.311V25.1H10.847Zm4.966,0h3.311V25.1H15.813Zm-4.966-4.966h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,0H9.192v3.311H5.881Zm18.208-14.9V3.583H20.779V1.928H9.192V3.583H5.881V1.928H2.571V28.413H27.4V1.928H24.089Zm1.655,24.83H4.226V8.549H25.745Z"
              fill="#037ca9"
            />
          </svg>
        </div>
        <figcaption className="pro-img-lrt-b text-n-ab">
          {closeDay?.map((curr) => `${curr}, `)}
          {/* Open Monday to Saturday,{" "} */}
          <span className="ms-2">( Closed )</span>
        </figcaption>
      </figure>
    </>
  );
};

export default RangeOfOpenDays;
