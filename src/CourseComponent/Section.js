import AllSectionTime from './AllSectionTime'
import AllSubsection from './AllSubsection'
import React from 'react';
import {Accordion, Button, Card, Modal, Nav} from "react-bootstrap";

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({showModal: true});
        let result = [];
        if (Object.values(this.props.data.subsections).length === 0) {
            let cartEntry = [];
            cartEntry.push(this.props.courseNumber);
            cartEntry.push(this.props.sectionNumber);
            cartEntry.push("");
            result.push(cartEntry);
        } else {//if the subsection is not empty
            for (const subsection of Object.entries(this.props.data.subsections)) {
                let cartEntry = [];
                cartEntry.push(this.props.courseNumber);
                cartEntry.push(this.props.sectionNumber);
                cartEntry.push(subsection[0]);
                result.push(cartEntry);
            }
        }
        console.log(result);
        this.props.addSelectedCourses(result);
    }

    close() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link">
                            <div>{this.props.sectionNumber}</div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse>
                        <Card.Body>
                            <h5>Instructor: </h5>
                            <div>{this.props.data.instructor}</div>
                            <p></p>
                            <h5>Time:</h5>
                            <AllSectionTime data={this.props.data.time}/>
                            <p></p>
                            <h5>Location: </h5>
                            <div>{this.props.data.location}</div>
                            <Nav className="justify-content-end">
                                <Button variant="primary" className="justify-content-end"
                                        onClick={(e) => this.open()}>Add to Cart</Button>
                            </Nav>
                            <Modal show={this.state.showModal} onHide={(e) => this.close()}>
                                <Modal.Body>
                                    <h4 align="center">Section Added</h4>
                                    <p></p>
                                    <p align="center">{this.props.courseNumber}-{this.props.sectionNumber} is added to
                                        your
                                        cart!</p>
                                </Modal.Body>
                                <Modal.Footer><Button onClick={(e) => this.close()}>Close</Button></Modal.Footer>
                            </Modal>
                            <Accordion defaultActiveKey="0" style={{marginTop: '5px'}}>
                                <AllSubsection data={this.props.data.subsections}
                                               courseNumber={this.props.courseNumber}
                                               sectionNumber={this.props.sectionNumber}
                                               addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
                            </Accordion>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>
        )
    }
}

export default Section;