import React from 'react';
import {Card, Button, Nav} from "react-bootstrap";

class PlannerCartItem extends React.Component {

    render() {
        return (
            <>
                <Card style={{marginBottom: '5px', marginLeft: '5px', marginRight: '5px'}}>
                    <Card.Body>
                        <h6>{this.props.courseNumber}</h6>
                        <div>Lecture: {this.props.courseSectionNumber} </div>
                        <div>{this.props.courseSubsectionNumber}</div>
                        <Nav className="justify-content-end">
                            <Button style={{
                            }} variant="primary" className="justify-content-end" size="sm"
                            >Add to Scheduler</Button>
                        </Nav>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default PlannerCartItem;