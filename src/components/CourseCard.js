import React from 'react';
import { Button, Card, Tabs, Tab } from 'react-bootstrap';

import '../css/components.css'

function CourseCard(props) {
    const { course } = props;
    
    console.log(course);

    return (
      <Card className="courseCard">
        <Tabs defaultActiveKey="course-info" style={{margin: 0}}>
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
            </div>
          </Tab>
          <Tab eventKey="sections" title="Sections">
            <div className="courseCardContent">

            </div>
          </Tab>
        </Tabs>
      </Card>
    )
}

export default CourseCard;