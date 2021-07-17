import React from "react";
import _ from "lodash";
import { Table } from "react-bootstrap";

import { UWButton } from ".";

import "../styles/components.scss";

function PlannerItem(props) {
  const { cart, course, timeBlocks, setTimeBlocks } = props;

  const onAddCourseButtonClick = () => {
    let newTimeBlocks = _.cloneDeep([...timeBlocks]);

    if (
      newTimeBlocks.findIndex((cartCourse) => course.key === cartCourse.key) < 0
    ) {
      let courseSections = [];
      if (course.sections) {
        for (const section of Object.entries(course.sections)) {
          let courseSubsections = [];
          if (section[1].subsections) {
            for (const subsection of Object.entries(section[1].subsections)) {
              courseSubsections.push({
                number: subsection[0],
              });
            }
          }
          courseSections.push({
            number: section[0],
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

      newTimeBlocks.push(newCourse);
    }

    setTimeBlocks(newTimeBlocks);
  };

  const onAddCourseSectionButtonClick = (section) => {
    let newCart = [...timeBlocks];
    const courseIndex = newCart.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );

    let newSubsections = [];
    if (section.subsections) {
      for (const subsection of Object.entries(section.subsections)) {
        newSubsections.push({
          number: subsection[0],
        });
      }
    }

    let newSection = {
      number: section.number,
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
      newCart.push(newCourse);
    } else {
      let newCourse = newCart[courseIndex];
      let newCourseSections = newCourse.sections;
      const sectionIndex = newCourseSections.findIndex(
        (newSection) => newSection.number === section.number
      );
      if (sectionIndex < 0) {
        newCourseSections.push(newSection);
      }
    }
    setTimeBlocks(newCart);
  };

  const onAddCourseSubSectionButtonClick = (
    sectionNumber,
    subsectionNumber
  ) => {
    // Find course
    const courseIndex = cart.findIndex(
      (cartCourse) => cartCourse.key === course.key
    );
    if (courseIndex >= 0) {
      let newCart = [...cart];
      let newCourse = newCart[courseIndex];
      let newCourseSections = newCourse.sections;

      // Find section
      const sectionIndex = newCourseSections.findIndex(
        (section) => section.number === sectionNumber
      );
      if (sectionIndex >= 0) {
        let newCourseSectionSubsections =
          newCourseSections[sectionIndex].subsections;

        // Find subsection
        const subsectionIndex = newCourseSectionSubsections.findIndex(
          (subsection) => subsection.number === subsectionNumber
        );

        if (subsectionIndex >= 0) {
          newCourseSectionSubsections.splice(subsectionIndex, 1);
        }

        if (newCourseSectionSubsections.length === 0) {
          newCourseSections.splice(sectionIndex, 1);
        }
      }

      if (newCourseSections.length === 0) {
        newCart.splice(courseIndex, 1);
      } else {
      }
    }
  };

  const renderCourseSections = (sections) => {
    return (
      sections.length > 0 &&
      sections.map((section) => (
        <Table key={section.number} bordered striped>
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
                    onClick={() =>
                      onAddCourseSectionButtonClick(section.number)
                    }
                  />
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
                          onAddCourseSubSectionButtonClick(
                            section.number,
                            subsection.number
                          )
                        }
                      />
                    </div>
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
      <div>
        <b>{course.number}</b>
      </div>
      <div>
        <b>{course.name}</b>
      </div>
      <div>{`Credits: ${course.credits}`}</div>
      <div>{renderCourseSections(course.sections)}</div>
      <UWButton
        label="Add All"
        onClick={onAddCourseButtonClick}
        justifyContent="flex-end"
      />
    </div>
  );
}

export default PlannerItem;
