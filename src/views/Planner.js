import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Carousel } from "react-bootstrap";

import { TabContent, PlannerItem, UWButton, Timetable } from "../components";

import { timeToNumber } from "../util";

function Planner(props) {
  const { cart } = props;

  const [selections, setSelections] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [scheduleIndex, setScheduleIndex] = useState(0);

  useEffect(() => {
    let cloneTime = (timeObj) => {
      const newTimeObj = _.cloneDeep(timeObj);
      for (const time of Object.entries(timeObj)) {
        const day = time[0];
        const range = time[1];
        newTimeObj[day] = timeToNumber(range);
      }
      return newTimeObj;
    };

    if (selections.length === 0) return;

    let timeBlocks = [];
    //for course in courses
    selections.forEach((course) => {
      const sections = course.sections;
      let courseTimeBlocks = [];
      //for section in course
      sections.forEach((section) => {
        const subsections = section.subsections;
        //if section has no subsections
        if (subsections.length === 0) {
          courseTimeBlocks.push([
            {
              name: course.number,
              number: section.number,
              time: section.time,
              range: cloneTime(section.time),
            },
          ]);
        } else {
          //for subsection in section
          subsections.forEach((subsection) => {
            courseTimeBlocks.push([
              {
                name: course.number,
                number: section.number,
                time: section.time,
                range: cloneTime(section.time),
              },
              {
                name: course.number,
                number: subsection.number,
                time: subsection.time,
                range: cloneTime(subsection.time),
              },
            ]);
          });
        }
      });
      timeBlocks.push(courseTimeBlocks);

      // Old algorithm
      // let newSchedules = [];
      // timeBlocks.forEach((timeBlock) => {
      //   timeBlock.forEach((combination) => {
      //     newSchedules.push(combination);
      //   });
      // });

      // setSchedules(newSchedules);

      // New Alogrithm

      // Merge schedules

      const hasConflict = (currBlocks, newBlock) => {
        currBlocks.forEach((currBlock) => {
          for (const currBlockRange of Object.entries(currBlock.range)) {
            const currBlockRangeDay = currBlockRange[0];
            const currBlockRangeStart = currBlockRange[1][0];
            const currBlockRangeEnd = currBlockRange[1][1];
            for (const newBlockRange of Object.entries(newBlock.range)) {
              const newBlockRangeDay = newBlockRange[0];
              const newBlockRangeStart = newBlockRange[1][0];
              const newBlockRangeEnd = newBlockRange[1][1];

              if (currBlockRangeDay === newBlockRangeDay) {
                if (
                  newBlockRangeStart.toFixed(3) - currBlockRangeEnd.toFixed(3) >
                    0 ||
                  newBlockRangeEnd.toFixed(3) - currBlockRangeStart.toFixed(3) >
                    0
                )
                  return true;
              }
            }
          }
        });
        return false;
      };

      timeBlocks.sort((course1, course2) => course2.length - course1.length);
      let newSchedules = _.cloneDeep(timeBlocks[0]);

      for (let i = 1; timeBlocks.length > 1 && i < timeBlocks.length; i++) {
        const nextCourse = timeBlocks[i];

        //For current schedules, insert a new course block
        newSchedules.forEach((combination, i) => {
          let newCombination = _.cloneDeep(combination);
          let shouldUpdate = true;
          let inserted = false;
          nextCourse.forEach((nextCourseBlocks) => {
            nextCourseBlocks.forEach((nextCourseBlock) => {
              if (!inserted) {
                if (hasConflict(newCombination, nextCourseBlock)) {
                  shouldUpdate = false;
                } else {
                  newCombination.push(nextCourseBlock);
                  inserted = true;
                }
              }
            });
          });
          if (shouldUpdate) newSchedules[i] = newCombination;
        });
      }

      setSchedules(newSchedules);
    });
  }, [selections]);

  useEffect(() => {
    if (cart.length === 0) setSchedules([]);
  }, [cart]);

  const handleSelect = (selectedIndex, e) => {
    setScheduleIndex(selectedIndex);
  };

  const getTotalCredits = () => {
    return cart.length < 2
      ? cart.length === 1
        ? cart[0].credits
        : 0
      : cart.reduce((curr, next) => curr.credits + next.credits);
  };

  return (
    <TabContent>
      <div
        style={{
          height: "100%",
          padding: 8,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: cart.length > 0 ? "flex-start" : "center",
            overflow: "auto",
            border: "1px solid #dee2e6",
            borderRadius: 5,
          }}
        >
          <div
            className="tabTitle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            My Course Cart
          </div>
          <div
            style={{
              margin: "4px 0px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {`Total Credits: ${getTotalCredits()}`}
          </div>
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: cart.length > 0 ? "flex-start" : "center",
              overflow: "auto",
              margin: "auto",
              padding: cart.length > 0 ? "0px 8px" : 0,
            }}
          >
            {cart.length > 0 ? (
              cart.map((course, i) => (
                <PlannerItem
                  key={course.number}
                  course={course}
                  cart={cart}
                  selections={selections}
                  setSelections={setSelections}
                />
              ))
            ) : (
              <div style={{ fontSize: 18, color: "darkgray" }}>
                Your cart is empty.
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
            border: "1px solid #dee2e6",
            borderRadius: 5,
            marginLeft: 8,
            paddingBottom: 8,
          }}
        >
          <div
            className="tabTitle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Schedule {schedules.length === 0 ? 0 : scheduleIndex + 1} of{" "}
            {schedules.length}
          </div>
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {schedules.length > 0 ? (
              <Carousel
                style={{ width: "92%", height: "95%" }}
                activeIndex={scheduleIndex}
                controls
                interval={null}
                onSelect={handleSelect}
                slide={false}
                indicators={false}
              >
                {schedules.map((schedule, i) => (
                  <Carousel.Item
                    key={i}
                    style={{
                      height: "63vh",
                      width: "100%",
                    }}
                  >
                    <Timetable schedule={schedule} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div
                style={{
                  fontSize: 18,
                  color: "darkgray",
                }}
              >
                No results.
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UWButton
              label="Clear all"
              onClick={() => {
                setSchedules([]);
                setSelections([]);
              }}
            />
          </div>
        </div>
      </div>
    </TabContent>
  );
}

export default Planner;
