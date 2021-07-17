import React, { useState } from "react";
import _ from "lodash";
import { Table } from "react-bootstrap";

import { UWButton } from "../components";

import "../styles/components.scss";

function PlannerItem(props) {
  const { course, timeBlocks, setTimeBlocks } = props;
  const [showAll, setShowAll] = useState(false);

  const onAddCourseButtonClick = () => {
    let newTimeBlocks = _.cloneDeep([...timeBlocks]);

    let courseSections = [];
    if (course.sections) {
      for (const section of Object.entries(course.sections)) {
        let courseSubsections = [];
        if (section[1].subsections) {
          for (const subsection of Object.entries(section[1].subsections)) {
            courseSubsections.push({
              number: subsection[0],
              time: subsection[1].time,
            });
          }
        }
        courseSections.push({
          number: section[0],
          time: section[1].time,
          subsections: courseSubsections,
        });
      }
    }

    const newCourse = {
      key: course.key,
      name: course.name,
      number: course.number,
      credits: course.credits,
      sections: courseSections,
    };

    const courseIndex = newTimeBlocks.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );
    if (courseIndex < 0) {
      newTimeBlocks.push(newCourse);
    } else {
      newTimeBlocks[courseIndex] = newCourse;
    }

    setTimeBlocks(newTimeBlocks);
  };

  const onAddCourseSectionButtonClick = (section) => {
    let newTimeBlocks = _.cloneDeep([...timeBlocks]);
    const courseIndex = newTimeBlocks.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );

    let newSubsections = [];
    if (section.subsections) {
      for (const subsection of Object.entries(section.subsections)) {
        newSubsections.push({
          time: subsection[1].time,
          number: subsection[0],
        });
      }
    }

    let newSection = {
      number: section.number,
      time: section.time,
      subsections: newSubsections,
    };

    if (courseIndex < 0) {
      const newCourse = {
        key: course.key,
        name: course.name,
        number: course.number,
        credits: course.credits,
        sections: [newSection],
      };
      newTimeBlocks.push(newCourse);
    } else {
      let newCourse = newTimeBlocks[courseIndex];
      let newCourseSections = newCourse.sections;
      const sectionIndex = newCourseSections.findIndex(
        (section) => section.number === section.number
      );
      if (sectionIndex < 0) {
        newCourseSections.push(newSection);
      } else {
        newCourseSections[sectionIndex] = newSection;
      }
    }
    setTimeBlocks(newTimeBlocks);
  };

  const onAddCourseSubSectionButtonClick = (section, subsection) => {
    let newTimeBlocks = _.cloneDeep([...timeBlocks]);
    const courseIndex = newTimeBlocks.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );

    let newSubsections = [];
    if (section.subsections) {
      for (const subsection of Object.entries(section.subsections)) {
        subsection.number === subsection[0] &&
          newSubsections.push({
            number: subsection.number,
            time: subsection.time,
          });
      }
    }

    let newSection = {
      number: section.number,
      time: section.time,
      subsections: newSubsections,
    };

    if (courseIndex < 0) {
      const newCourse = {
        key: course.key,
        name: course.name,
        number: course.number,
        credits: course.credits,
        sections: [newSection],
      };
      newTimeBlocks.push(newCourse);
    } else {
      let newCourse = newTimeBlocks[courseIndex];
      let newCourseSections = newCourse.sections;
      const sectionIndex = newCourseSections.findIndex(
        (section) => section.number === section.number
      );
      if (sectionIndex < 0) {
        newCourseSections.push(newSection);
      } else {
        let newSubsections = newCourseSections[sectionIndex].subsections;
        const subsectionIndex = newSubsections.findIndex(
          (subsection) => subsection.number === subsection.number
        );
        if (subsectionIndex < 0) {
          newSubsections.push({
            number: subsection.number,
          });
        }
      }
    }
    setTimeBlocks(newTimeBlocks);
  };

  const renderTime = (sechdule) => {
    let timetable = [];

    for (const event of Object.entries(sechdule)) {
      const day = event[0];
      const time = event[1];
      timetable.push(
        <tr
          key={day}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <td
            style={{
              textTransform: "capitalize",
              width: 200,
            }}
          >
            {day}
          </td>
          <td>{time}</td>
        </tr>
      );
    }

    return (
      <div style={{ flex: 1 }}>
        <Table borderless style={{ marginTop: 4, width: "100%" }}>
          <tbody>{timetable}</tbody>
        </Table>
      </div>
    );
  };

  const renderCourseSections = (sections) => {
    return (
      sections.length > 0 &&
      sections.map((section) => (
        <Table striped key={section.number} bordered>
          <thead>
            <tr>
              <th>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {section.number}
                  <UWButton
                    label="Add"
                    variant="clean"
                    onClick={() => onAddCourseSectionButtonClick(section)}
                  />
                </div>
                <div
                  style={{
                    fontWeight: 400,
                  }}
                >
                  {renderTime(section.time)}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {section.subsections.length > 0 &&
              section.subsections.map((subsection) => (
                <tr key={subsection.number}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {subsection.number}
                      <UWButton
                        label="Add"
                        variant="clean"
                        onClick={() =>
                          onAddCourseSubSectionButtonClick(section, subsection)
                        }
                      />
                    </div>
                    <div>{renderTime(subsection.time)}</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ))
    );
  };

  return (
    <div className="cartItem">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <b>{course.number}</b>
        <UWButton
          label={showAll ? "Hide all" : "Show all"}
          onClick={() => {
            setShowAll((showAll) => !showAll);
          }}
          variant="clean"
        />
      </div>
      <div>
        <b>{course.name}</b>
      </div>
      <div>{`Credits: ${course.credits}`}</div>
      <div>{showAll && renderCourseSections(course.sections)}</div>
      <UWButton
        label="Add all to schedule"
        onClick={onAddCourseButtonClick}
        justifyContent="center"
      />
    </div>
  );
}

export default PlannerItem;
