import React from "react";
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
      let newCart = [...cart];
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
      let newCart = [...cart];
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
        setCart(newCart);
      } else {
        setCart(newCart);
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {subsection.number}
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
