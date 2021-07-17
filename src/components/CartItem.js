import React from "react";
import _ from "lodash";
import { Table } from "react-bootstrap";

import { UWButton } from "../components";

import "../styles/components.scss";

function CartItem(props) {
  const { cart, setCart, course } = props;

  const onRemoveCourseButtonClick = () => {
    // Find course
    const courseIndex = cart.findIndex(
      (cartCourse) => cartCourse.key === course.key
    );
    if (courseIndex >= 0) {
      let newCart = _.cloneDeep([...cart]);
      newCart.splice(courseIndex, 1);
      setCart(newCart);
    }
  };

  const onRemoveCourseSectionButtonClick = (sectionNumber) => {
    // Find course
    const courseIndex = cart.findIndex(
      (cartCourse) => cartCourse.key === course.key
    );
    if (courseIndex >= 0) {
      let newCart = _.cloneDeep([...cart]);
      let newCourse = newCart[courseIndex];
      let newCourseSections = newCourse.sections;

      // Find section
      const sectionIndex = newCourseSections.findIndex(
        (section) => section.number === sectionNumber
      );
      if (sectionIndex >= 0) {
        newCourseSections.splice(sectionIndex, 1);
      }
      // newCourse.sections = newCourseSections;

      if (newCourseSections.length === 0) {
        newCart.splice(courseIndex, 1);
        setCart(newCart);
      } else {
        setCart(newCart);
      }
    }
  };

  const onRemoveCourseSubSectionButtonClick = (
    sectionNumber,
    subsectionNumber
  ) => {
    // Find course
    const courseIndex = cart.findIndex(
      (cartCourse) => cartCourse.key === course.key
    );
    if (courseIndex >= 0) {
      let newCart = _.cloneDeep([...cart]);
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
        setCart(newCart);
      } else {
        setCart(newCart);
      }
    }
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
          <td style={{ textTransform: "capitalize", width: 200 }}>{day}</td>
          <td>{time}</td>
        </tr>
      );
    }

    return (
      <div style={{ flex: 1 }}>
        <Table borderless style={{ marginTop: 4, width: "50%" }}>
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
                <div>{section.number}</div>
                <div
                  style={{
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  {renderTime(section.time)}
                  <UWButton
                    label="Remove"
                    variant="clean"
                    onClick={() =>
                      onRemoveCourseSectionButtonClick(section.number)
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
                    <div>{subsection.number}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {renderTime(subsection.time)}
                      <UWButton
                        label="Remove"
                        variant="clean"
                        onClick={() =>
                          onRemoveCourseSubSectionButtonClick(
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
      <div className="cardItemTitle">
        {course.number} {course.name}
      </div>
      <div>{`Credits: ${course.credits}`}</div>
      <div>{renderCourseSections(course.sections)}</div>
      <UWButton
        label="Remove All"
        onClick={onRemoveCourseButtonClick}
        justifyContent="center"
      />
    </div>
  );
}

export default CartItem;
