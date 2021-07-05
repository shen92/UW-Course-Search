import React, {Component} from 'react';
import {Card, Button, Nav, Row, Col} from "react-bootstrap";

class CartItem extends Component {

    render() {
        return (
            <>
                <Card style={{margin: '5px'}}>
                    <Card.Body>
                        <h6>{this.props.courseNumber}</h6>
                        <div>Lecture: {this.props.courseSectionNumber} </div>
                        <div>{this.props.courseSubsectionNumber}</div>
                        <Row>
                            <Col>
                                <Nav className="justify-content-center">
                                    <Button variant="danger" className="justify-content-end" size="sm"
                                            style={{marginTop: '15px', marginBottom: '-15px'}}
                                            onClick={(e) => this.props.removeSelectedCourse(this.props.courseNumber)}>Remove
                                        Course
                                    </Button>
                                </Nav>
                            </Col>
                            <Col>
                                <Nav className="justify-content-center">
                                    <Button variant="danger" className="justify-content-end" size="sm"
                                            style={{marginTop: '15px', marginBottom: '-15px'}}
                                            onClick={(e) => this.props.removeSelectedSection(this.props.courseNumber, this.props.courseSectionNumber)}>Remove
                                        Section
                                    </Button>
                                </Nav>
                            </Col>
                            <Col>
                                <Nav className="justify-content-center">
                                    <Button variant="danger" className="justify-content-end" size="sm"
                                            style={{marginTop: '15px', marginBottom: '-15px'}}
                                            onClick={(e) => this.props.removeSelectedSubsection(this.props.courseNumber, this.props.courseSectionNumber, this.props.courseSubsectionNumber)}>Remove
                                        Subsection
                                    </Button>
                                </Nav>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default CartItem;