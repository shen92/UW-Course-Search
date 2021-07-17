import React, { useState } from "react";
import { Accordion, Button, Card, Tabs, Tab, Table } from "react-bootstrap";

import { UWButton, MessageModal } from "../components";

import "../styles/components.scss";

function CourseCard(props) {
  const { course, cart, setCart } = props;
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onAddCourseButtonClick = () => {
    let newCart = [...cart];

    if (newCart.findIndex((cartCourse) => course.key === cartCourse.key) < 0) {
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

      newCart.push(newCourse);
    }

    setCart(newCart);
    setModalMessage(
      `${course.number} ${course.name} has been added to your cart.`
    );
    setShowMessageModal(true);
  };

  const onAddSectionButtonClick = (sectionNumber, sectionContent) => {
    let newCart = [...cart];
    const courseIndex = newCart.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );

    let newSubsections = [];
    if (sectionContent.subsections) {
      for (const subsection of Object.entries(sectionContent.subsections)) {
        newSubsections.push({
          number: subsection[0],
        });
      }
    }

    let newSection = {
      number: sectionNumber,
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
        (section) => section.number === sectionNumber
      );
      if (sectionIndex < 0) {
        newCourseSections.push(newSection);
      }
    }
    setCart(newCart);
    setModalMessage(
      `${course.number} ${course.name} ${sectionNumber} has been added to your cart.`
    );
    setShowMessageModal(true);
  };

  const onAddSubsectionButtonClick = (
    sectionNumber,
    sectionContent,
    subsectionNumber
  ) => {
    let newCart = [...cart];
    const courseIndex = newCart.findIndex(
      (cartCourse) => course.key === cartCourse.key
    );

    let newSubsections = [];
    if (sectionContent.subsections) {
      for (const subsection of Object.entries(sectionContent.subsections)) {
        subsectionNumber === subsection[0] &&
          newSubsections.push({
            number: subsection[0],
          });
      }
    }

    let newSection = {
      number: sectionNumber,
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
        (section) => section.number === sectionNumber
      );
      if (sectionIndex < 0) {
        newCourseSections.push(newSection);
      } else {
        let newSubsections = newCourseSections[sectionIndex].subsections;
        const subsectionIndex = newSubsections.findIndex(
          (subsection) => subsection.number === subsectionNumber
        );
        if (subsectionIndex < 0) {
          newSubsections.push({
            number: subsectionNumber,
          });
        }
      }
    }
    setCart(newCart);
    setModalMessage(
      `${course.number} ${course.name} ${sectionNumber} ${subsectionNumber} has been added to your cart.`
    );
    setShowMessageModal(true);
  };

  const renderCourseSections = (sections) => {
    let courseSections = [];
    let index = 0;

    for (const section of Object.entries(sections)) {
      const sectionNumber = section[0];
      const sectionContent = section[1];
      index++;
      courseSections.push(
        <Card key={index}>
          <Card.Header
            style={{
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={index}
              style={{
                margin: 0,
                padding: 0,
                outline: "none",
                border: "none",
                textDecoration: "none",
              }}
            >
              {sectionNumber}
            </Accordion.Toggle>
            <UWButton
              label="Add to cart"
              variant="clean"
              onClick={() =>
                onAddSectionButtonClick(sectionNumber, sectionContent)
              }
            />
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body style={{ padding: 12 }}>
              <div className="courseCardBody">
                <b>Instructor</b>: {sectionContent.instructor}
              </div>
              <div className="courseCardBody">
                <b>Location</b>: {sectionContent.location}
              </div>
              {sectionContent.time &&
                Object.keys(sectionContent.time).length > 0 && (
                  <>
                    <div className="courseCardBody">
                      <b>Time:</b>
                    </div>
                    {renderTime(sectionContent.time)}
                  </>
                )}
              {sectionContent.subsections &&
                Object.keys(sectionContent.subsections).length > 0 && (
                  <Accordion style={{ margin: "8px 0px" }}>
                    {renderCourseSubsections(sectionNumber, sectionContent)}
                  </Accordion>
                )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }

    return courseSections;
  };

  const renderCourseSubsections = (sectionNumber, sectionContent) => {
    let courseSubsections = [];
    let index = 0;

    for (const subSection of Object.entries(sectionContent.subsections)) {
      const subSectionNumber = subSection[0];
      const subSectionContent = subSection[1];
      index++;
      courseSubsections.push(
        <Card key={index}>
          <Card.Header
            style={{
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={index}
              style={{
                margin: 0,
                padding: 0,
                outline: "none",
                border: "none",
                textDecoration: "none",
              }}
            >
              {subSectionNumber}
            </Accordion.Toggle>
            <UWButton
              label="Add to cart"
              variant="clean"
              onClick={() =>
                onAddSubsectionButtonClick(
                  sectionNumber,
                  sectionContent,
                  subSectionNumber
                )
              }
            />
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body style={{ padding: 12 }}>
              <div className="courseCardBody">
                <b>Location:</b> {subSectionContent.location}
              </div>
              {subSectionContent.time &&
                Object.keys(subSectionContent.time).length > 0 && (
                  <>
                    <div className="courseCardBody">
                      <b>Time:</b>
                    </div>
                    {renderTime(subSectionContent.time)}
                  </>
                )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }

    return courseSubsections;
  };

  const renderTime = (sechdule) => {
    let timetable = [];

    for (const event of Object.entries(sechdule)) {
      const day = event[0];
      const time = event[1];
      timetable.push(
        <tr key={day}>
          <td style={{ textTransform: "capitalize" }}>{day}</td>
          <td>{time}</td>
        </tr>
      );
    }

    return (
      <div>
        <Table borderless style={{ marginTop: 4, width: "50%" }}>
          <tbody>{timetable}</tbody>
        </Table>
      </div>
    );
  };

  return (
    <>
      <Card className="courseCard">
        <Tabs
          defaultActiveKey="course-info"
          style={{
            backgroundColor: "white",
            margin: "-1px 0px 0px 0px",
            zIndex: 1000,
          }}
        >
          <Tab eventKey="course-info" title="Course Info">
            <div className="courseCardContent">
              <div
                className="courseCardTitle"
                style={{ display: "flex", marginTop: 4 }}
              >
                <div>{course.number}</div>
                <div style={{ marginLeft: 8 }}>{course.name}</div>
              </div>
              <div
                className="courseCardBody"
                style={{ width: "80%", marginTop: 0 }}
              >
                {`Credits: ${course.credits}`}
              </div>
              <div
                className="courseCardBody"
                style={{ width: "80%", marginTop: 8 }}
              >
                {course.description}
              </div>
              <div style={{ display: "flex", margin: "8px 0px 80px" }}>
                {course.keywords.map((keyword) => (
                  <div key={keyword} className="keywordTag">
                    {keyword}
                  </div>
                ))}
              </div>
              <UWButton label="Add to cart" onClick={onAddCourseButtonClick} />
            </div>
          </Tab>
          <Tab eventKey="sections" title="Sections">
            <div className="courseCardContent">
              <div
                className="courseCardTitle"
                style={{ display: "flex", marginTop: 4 }}
              >
                <div>{course.number}</div>
                <div style={{ marginLeft: 8 }}>{course.name}</div>
              </div>
              <Accordion style={{ margin: "8px 0px" }}>
                {course.sections && renderCourseSections(course.sections)}
              </Accordion>
            </div>
          </Tab>
        </Tabs>
      </Card>
      <MessageModal
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        modalMessage={modalMessage}
      />
    </>
  );
}

export default CourseCard;
