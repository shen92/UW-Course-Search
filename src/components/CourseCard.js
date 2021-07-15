import React from 'react';
import { Accordion, Button, Card, Tabs, Tab, Table } from 'react-bootstrap';

import '../styles/components.scss'

function CourseCard(props) {
    const { course, cart, setCart } = props;

    const addAll = () => {
      const cartCourse = {
        key: course.key,
        name: course.name,
        number: course.number,
        credits: course.credits,
        sections: course.sections
      }
      if (cart.findIndex(cartCourse => course.key === cartCourse.key) < 0) {
        let newCart = [...cart];
        newCart.push(cartCourse);
        setCart(newCart);
      }
      
    }

    const renderCourseSections = (sections) => {
      let courseSections = [];
      let index = 0;

      for (const section of Object.entries(sections)) {
        const sectionName = section[0];
        const sectionContent = section[1];
        index++;
        courseSections.push(
          <Card key={index}>
            <Card.Header style={{ padding: 12 }}>
              <Accordion.Toggle 
                as={Button} 
                variant="link" 
                eventKey={index} 
                style={{
                  margin: 0,
                  padding: 0,
                  outline: 'none',
                  border: 'none'
                }}
              >
                {sectionName}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body style={{ padding: 12 }}>
                <div className="courseCardBody">
                  {`Instructor: ${sectionContent.instructor}`}
                </div>
                <div className="courseCardBody">
                  {`Location: ${sectionContent.location}`}
                </div>
                {sectionContent.time && Object.keys(sectionContent.time).length > 0 && 
                <>
                  <div className="courseCardBody">
                    Time:
                  </div>
                  {renderTime(sectionContent.time)}
                </>}
                {sectionContent.subsections && Object.keys(sectionContent.subsections).length > 0 && 
                <>
                  <div className="courseCardBody">
                    Subsections:
                  </div>
                  <Accordion style={{margin: '8px 0px'}}>
                    {renderCourseSubsections(sectionContent.subsections)}
                  </Accordion>
                </>}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
        
      }

      return courseSections;
    }

    const  renderCourseSubsections = (subsections) => {
      let courseSubsections = [];
      let index = 0;

      for (const subSection of Object.entries(subsections)) {
        const subSectionName = subSection[0];
        const subSectionContent = subSection[1];
        index++;
        courseSubsections.push(
          <Card key={index}>
            <Card.Header style={{ padding: 12 }}>
              <Accordion.Toggle 
                as={Button} 
                variant="link" 
                eventKey={index} 
                style={{
                  margin: 0,
                  padding: 0,
                  outline: 'none',
                  border: 'none'
                }}
              >
                {subSectionName}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body style={{ padding: 12 }}>
                <div className="courseCardBody">
                  {`Location: ${subSectionContent.location}`}
                </div>
                {subSectionContent.time && Object.keys(subSectionContent.time).length > 0 && 
                <>
                  <div className="courseCardBody">
                    Time:
                  </div>
                  {renderTime(subSectionContent.time)}
                </>}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
        
      }

      return courseSubsections;
    }

    const renderTime = (sechdule) => {
      let timetable = []

      for (const event of Object.entries(sechdule)) {
        const day = event[0];
        const time = event[1];
        timetable.push(
          <tr key={day}>
            <td style={{textTransform: 'capitalize'}}>
              <b>
                {day}
              </b>
            </td>
            <td>{time}</td>
          </tr>
        )
      }

      return (
        <div>
          <Table bordered style={{marginTop: 4, width: '50%'}}>
            <tbody>
              {timetable}
            </tbody>
          </Table>
        </div>
      )
    }

    return (
      <Card className="courseCard">
        <Tabs defaultActiveKey="course-info" style={{ backgroundColor: 'white', margin: '-1px 0px 0px 0px', zIndex: 1000}}>
          <Tab eventKey="course-info" title="Course Info">
            <div className="courseCardContent">
              <div className="courseCardTitle" style={{ display: 'flex', marginTop: 4 }}>
                <div>
                  {course.number}
                </div>
                <div style={{ marginLeft: 8 }}>
                  {course.name}
                </div>
              </div>
              <div className="courseCardBody" style={{ width: '80%', marginTop: 0 }}>
                {`Credits: ${course.credits}`}
              </div>
              <div className="courseCardBody" style={{ width: '80%', marginTop: 8 }}>
                {course.description}
              </div>
              <div style={{ display: 'flex', marginTop: 64 }}>
                {course.keywords.map(keyword => 
                  <div key={keyword} className="keywordTag">{keyword}</div>
                )}
              </div>
              <style type="text/css">
                {`
                .btn-uw {
                  background-color: #c5050c;
                  color: white;
                }
                .btn-uw:hover {
                  color: white;
                }
                `}
              </style>
              <Button 
                variant="uw" 
                className="uwButton" 
                style={{ marginTop: 12 }}
                onClick={addAll}
              >
                Add to Cart
              </Button>
            </div>
          </Tab>
          <Tab eventKey="sections" title="Sections">
            <div className="courseCardContent">
              <div className="courseCardTitle" style={{ display: 'flex', marginTop: 4 }}>
                <div>
                  {course.number}
                </div>
                <div style={{ marginLeft: 8 }}>
                  {course.name}
                </div>
              </div>
              <Accordion style={{margin: '8px 0px'}}>
                {course.sections && renderCourseSections(course.sections)}
              </Accordion>
            </div>
          </Tab>
        </Tabs>
      </Card>
    )
}

export default CourseCard;