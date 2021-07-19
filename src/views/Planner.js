import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import { TabContent, PlannerItem, UWButton, Timetable } from "../components";

function Planner(props) {
  const { cart } = props;

  const [selections, setSelections] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [scheduleIndex, setScheduleIndex] = useState(0);

  useEffect(() => {
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
            { name: course.number, number: section.number, time: section.time },
          ]);
        } else {
          //for subsection in section
          subsections.forEach((subsection) => {
            courseTimeBlocks.push([
              {
                name: course.number,
                number: section.number,
                time: section.time,
              },
              {
                name: course.number,
                number: subsection.number,
                time: subsection.time,
              },
            ]);
          });
        }
      });
      timeBlocks.push(courseTimeBlocks);
      let newSchedules = [];
      timeBlocks.forEach((timeBlock) => {
        timeBlock.forEach((combination) => {
          newSchedules.push(combination);
        });
      });
      setSchedules(newSchedules);
    });
  }, [selections]);

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
            Schedule {scheduleIndex + 1} of {schedules.length}
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
