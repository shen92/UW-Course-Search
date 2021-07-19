import React from "react";

import "../styles/components.scss";

import { timeToNumber } from "../util";

function Timetable(props) {
  const { schedule } = props;

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
      const start = timeToNumber(duration)[0];
      const end = timeToNumber(duration)[1];
      days[day].push(
        <div
          key={`${timeBlock.name} + ${timeBlock.number} + ${day} + ${duration}`}
          className="timetableBlock"
          style={{
            top: `calc(${(100 * (start - 8)) / 14}% + 44px)`,
            height: `${(100 * (end - start)) / 14}%`,
          }}
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
