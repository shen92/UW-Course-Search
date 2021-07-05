import React from 'react';
import PreviousCourse from "./PreviousCourse";
import {Spinner, Nav, Card} from "react-bootstrap";

class PreviousCourseArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: true
        }
    }

    componentWillReceiveProps() {
        this.setState({isWaiting: this.props.previousCourses.length === 0});
    }

    wait() {
        return (
            <Nav className="justify-content-center">
                <Spinner style={{marginTop: '200px'}} animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Nav>
        )
    }

    getPreviousCourseHistory() {
        let prevCourses = [];
        for (const course of Object.entries(this.props.previousCourses)) {
            prevCourses.push(
                <PreviousCourse
                    key={course[0]}
                    data={course[1]}
                    addUserCourse={(selectedCourse) => this.props.addUserCourse(selectedCourse)}
                    removeUserCourse={(selectedCourse) => this.props.removeUserCourse(selectedCourse)}
                />
            )
        }
        return prevCourses;
    }

    render() {
        return (
            <Card style={{
                width: '25%',
                marginTop: '5px',
                marginLeft: '5px',
                marginRight: '5px',
                height: '93.4%',
                position: 'fixed',
                overflow: 'auto'
            }}>
                <h4 align="center">Course History</h4>
                {this.state.isWaiting ? this.wait() : this.getPreviousCourseHistory()}
            </Card>
        );
    }
}

export default PreviousCourseArea;