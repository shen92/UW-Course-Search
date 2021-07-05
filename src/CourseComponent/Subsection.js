import AllSubsectionTime from './AllSubsectionTime'
import React from 'react';
import {Accordion, Button, Card, Modal, Nav} from "react-bootstrap";

class Subsection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({showModal: true});
        let result = [];
        let cartEntry = [];
        cartEntry.push(this.props.courseNumber);
        cartEntry.push(this.props.sectionNumber);
        cartEntry.push(this.props.subsectionNumber);
        result.push(cartEntry);
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
                            <div>{this.props.name}</div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse>
                        <Card.Body>
                            <h5>Time: </h5>
                            <AllSubsectionTime data={this.props.data.time}/>
                            <p></p>
                            <h5>Location:</h5>
                            <div>{this.props.data.location}</div>
                            <Nav className="justify-content-end">
                                <Button variant="primary" className="justify-content-end"
                                        onClick={(e) => this.open()}>Add to Cart</Button>
                            </Nav>
                            <Modal show={this.state.showModal} onHide={(e) => this.close()}>
                                <Modal.Body>
                                    <h4 align="center">Subsection Added</h4>
                                    <p></p>
                                    <p align="center">{this.props.courseNumber}-{this.props.sectionNumber}-{this.props.subsectionNumber} is
                                        added to your
                                        cart!</p>
                                </Modal.Body>
                                <Modal.Footer><Button onClick={(e) => this.close()}>Close</Button></Modal.Footer>
                            </Modal>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>
        )
    }
}

export default Subsection;