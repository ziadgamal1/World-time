import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Clock.module.css";
export default function Clock() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      const formattedTime =
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");
      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(timerId);
  });
  return (
    <div className={"h3 text-center mt-5" + " " + classes.text}>
      {time ? time : <span className={classes.loader}></span>}
    </div>
  );
}
