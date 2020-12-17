//@ts-check

import Head from "next/head";
import { useState, useEffect } from "react";
import moment from "moment";

const COLORS = ["#3AA3F7", "#f58442", "#479A5F", "#A61006"];

const LEAVE_DATE = moment("2020-12-19 08:00:00");

function asStr(v, title) {
  if (!v) {
    return "";
  }
  return `${v} ${title}${v > 1 ? "s" : ""}`;
}

function getTimeLeft() {
  const now = moment();
  const weeks = LEAVE_DATE.diff(now, "weeks");
  const days = LEAVE_DATE.diff(now, "days") - weeks * 7;
  const hours = LEAVE_DATE.diff(now, "hours") - weeks * 7 * 24 - days * 24;
  const minutes =
    LEAVE_DATE.diff(now, "minutes") -
    weeks * 7 * 24 * 60 -
    days * 24 * 60 -
    hours * 60;
  const seconds =
    LEAVE_DATE.diff(now, "seconds") -
    weeks * 7 * 24 * 60 * 60 -
    days * 24 * 60 * 60 -
    hours * 60 * 60 -
    minutes * 60;

  const res = [
    [weeks, "week"],
    [days, "day"],
    [hours, "hour"],
    [minutes, "minute"],
    [seconds, "second"],
  ]
    .map(([v, t]) => asStr(v, t))
    .filter((a) => !!a);

  const last = res.pop();

  return `${res.join(", ")} and ${last}`;
}

export default function Home() {
  const [colorKey, setColorKey] = useState(0);
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const t = setTimeout(() => {
      setColorKey(colorKey === COLORS.length - 1 ? 0 : colorKey + 1);
    }, 2000);
    return () => clearInterval(t);
  }, [colorKey]);

  useEffect(() => {
    setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>☀️ How long until the sun?</title>
      </Head>
      <div className="App" style={{ backgroundColor: COLORS[colorKey] }}>
        <h1>{time} until sun!</h1>
        <h1>
          <span role="img" aria-label="heart">
            ☀️🏖
          </span>
        </h1>
      </div>
    </>
  );
}
