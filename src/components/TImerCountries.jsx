import { useEffect, useState } from "react";
import classes from "./Clock.module.css";
export default function Timer({ selected }) {
  const [actualTime, setActualTime] = useState(undefined);
  useEffect(() => {
    const { latlng } = selected;
    let timerID;
    let isMounted = true;
    async function getTime(latlng) {
      const date1 = performance.now();
      const requestOptions = {
        method: "GET",
        headers: { "X-Api-Key": "QDmowASzgh3yRyF5Cjw4iQ==hVoYchL6YbF4nnMe" },
      };
      const response = await fetch(
        `'https://timeapi.io/api/time/current/coordinate?latitude=${latlng[0]}&longitude=${latlng[1]}'`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const dateBase = new Date(data.datetime);

      const timeNew = dateBase.getTime();
      function getDynamicDate() {
        const currentTime = performance.now();
        const dynamicDate = new Date(currentTime - date1 + timeNew - 7000);
        return dynamicDate;
      }
      timerID = setInterval(() => {
        if (!isMounted) return;
        const finalTime = getDynamicDate();
        const formattedTime =
          finalTime.getHours().toString().padStart(2, "0") +
          ":" +
          finalTime.getMinutes().toString().padStart(2, "0") +
          ":" +
          finalTime.getSeconds().toString().padStart(2, "0");
        setActualTime(formattedTime);
      }, 1000);
    }
    getTime(latlng);
    return () => {
      isMounted = false;
      if (timerID) clearInterval(timerID);
    };
  }, [selected]);
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     const timeNew = time + 1000;
  //     setTime(timeNew);
  //     const date = new Date(timeNew);
  //     const formattedTime =
  //       date.getHours().toString().padStart(2, "0") +
  //       ":" +
  //       date.getMinutes().toString().padStart(2, "0") +
  //       ":" +
  //       date.getSeconds().toString().padStart(2, "0");
  //     setActualTime(formattedTime);
  //   }, 1000);
  //   return () => clearInterval(timerId);
  // }, [time, actualTime]);
  return (
    <>
      <div className={"h3 text-center mt-3" + " " + classes.text}>
        {actualTime ? actualTime : <span className={classes.loader}></span>}
      </div>
    </>
  );
}
