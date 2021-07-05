import React from 'react';
import '../App.css';
import {Button, Accordion, Tab, Tabs, Nav, Modal, Card} from "react-bootstrap";
import AllSection from './AllSection'

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({showModal: true});
        let result = [];
        let courseNumber = this.props.data.number;
        for (const section of Object.entries(this.props.data.sections)) {
            let sectionNumber = section[0];
            if (Object.values(section[1].subsections).length === 0) {
                let cartEntry = [];
                cartEntry.push(courseNumber);
                cartEntry.push(sectionNumber);
                cartEntry.push("");
                result.push(cartEntry);
            } else {//if the subsection is not empty
                for (const subsection of Object.entries(section[1].subsections)) {
                    let cartEntry = [];
                    cartEntry.push(courseNumber);
                    cartEntry.push(sectionNumber);
                    cartEntry.push(subsection[0]);
                    result.push(cartEntry);
                }
            }
        }
        this.props.addSelectedCourses(result);
    }

    close() {
        this.setState({showModal: false});
    }

    getKeywords(keywords) {
        let kw = "";
        for (let i = 0; i < keywords.length - 1; i++) {
            kw += keywords[i] + ", ";
        }
        kw += keywords[keywords.length - 1];
        return (<div>Keywords: {kw}</div>);
    }

    render() {
        return (
            <div>
                <Card style={{marginBottom:'5px', marginLeft:'5px', marginRight:'5px'}}>
                    <Tabs style={{marginTop: '8px', marginLeft: '8px', marginBottom: '8px', marginRight: '8px'}}
                          defaultActiveKey="course-info">
                        <Tab style={{
                            marginTop: '5px',
                            marginLeft: '12px',
                            marginBottom: '10px',
                            marginRight: '12px'
                        }}
                             eventKey="course-info" title="Course Info">
                            <h3>{this.props.data.number}: {this.props.data.name}</h3>
                            <p>Credits: {this.props.data.credits}</p>
                            <h6>Course Description: </h6>
                            <div>{this.props.data.description}</div>
                            <p></p>
                            <div>{this.getKeywords(this.props.data.keywords)}</div>
                            <div>Subjects: {this.props.data.subject}</div>
                            <p></p>
                            <Nav className="justify-content-end">
                                <Button style={{
                                    marginTop: '15px',
                                    marginLeft: '15px',
                                    marginBottom: '5px',
                                    marginRight: '15px'
                                }} variant="primary" className="justify-content-end"
                                        onClick={(e) => this.open()}>Add to Cart</Button>
                            </Nav>
                            <Modal show={this.state.showModal} onHide={(e) => this.close()}>
                                <Modal.Body>
                                    <h4 align="center">Course Added</h4>
                                    <p></p>
                                    <p align="center">{this.props.data.number}: {this.props.data.name} is added to
                                        your
                                        cart!</p>
                                </Modal.Body>
                                <Modal.Footer><Button onClick={(e) => this.close()}>Close</Button></Modal.Footer>
                            </Modal>
                        </Tab>
                        <Tab style={{
                            marginTop: '5px',
                            marginLeft: '12px',
                            marginBottom: '10px',
                            marginRight: '12px'
                        }}
                             eventKey="sections" title="Sections">
                            <h3>{this.props.data.number} {this.props.data.name}</h3>
                            <Accordion style={{marginTop: '10px'}}>
                                <AllSection data={this.props.data.sections} courseNumber={this.props.data.number}
                                            addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
                            </Accordion>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

export default Course;
