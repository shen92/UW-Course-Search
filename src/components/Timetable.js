import React from "react";

import "../styles/components.scss";

import { timeToNumber } from "../util";

const schedule = [
  {
    name: "COMP SCI 252",
    number: "LEC_005",
    time: {
      friday: "12:05pm - 12:55pm",
      monday: "12:05pm - 12:55pm",
      wednesday: "12:05pm - 12:55pm",
    },
  },
  {
    name: "COMP SCI 200",
    number: "LEC_001",
    time: { thursday: "8:00am - 9:15am", tuesday: "8:00am - 9:15am" },
  },
  {
    name: "COMP SCI 200",
    number: "LAB_315",
    time: { wednesday: "4:00pm - 5:15pm" },
  },
];

function Timetable(props) {
  let days = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };

  schedule.forEach((timeBlock) => {
    for (const time of Object.entries(timeBlock.time)) {
      const day = time[0];
      const duration = time[1];
      const start = timeToNumber(time[1])[0];
      const end = timeToNumber(time[1])[1];
      console.log(timeToNumber(time[1]));
      console.log(`${(100 * start) / 24}% + `);
      days[day].push(
        <div
          className="timetableBlock"
          style={{ top: `calc(${(100 * (start - 8)) / 24}% + 44px)` }}
        >
          <div>{timeBlock.name}</div>
          <div>{timeBlock.number}</div>
          <div>{duration}</div>
        </div>
      );
    }
  });

  return (
    <div className="timetable">
      <div className="timetableDay">
        <div className="timetableTitle">Monday</div>
        {days.monday}
      </div>
      <div className="timetableDay">
        <div className="timetableTitle">Tuesday</div>
        {days.tuesday}
      </div>
      <div className="timetableDay">
        <div className="timetableTitle">Wednesday</div>
        {days.wednesday}
      </div>
      <div className="timetableDay">
        <div className="timetableTitle">Thursday</div>
        {days.thursday}
      </div>
      <div className="timetableDay">
        <div className="timetableTitle">Friday</div>
        {days.friday}
      </div>
    </div>
  );
}

export default Timetable;
