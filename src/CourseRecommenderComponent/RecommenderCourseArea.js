import React from 'react';
import '../App.css';
import Course from '../CourseComponent/Course';

class RecommenderCourseArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedCourses: []
        }
    }

    componentWillReceiveProps() {
        this.rateAndSortCourses();
    }

    checkIn() {
        console.log(this.props.userCourses);
        console.log(this.props.userSubjects);
        console.log(this.props.userKeywords);
    }

    getCourses() {
        let courses = [];
        for (const course of Object.values(this.state.sortedCourses)) {
            courses.push(
                <Course key={course[0][0]} data={course[0][1]}
                        addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
            )
        }
        return courses;
    }

    isTaken(course) {
        for (const prev of Object.entries(this.props.previousCourses)) {
            if (course[1] === prev[1]) {
                return true;
            }
        }
        return false;
    }

    rateAndSortCourses() {
        let result = [];
        for (const course of Object.entries(this.props.filteredCourses)) {
            if (!this.isTaken(course)) {
                let courseRate = [];
                courseRate.push(course);
                let score = this.calculateScore(course);
                courseRate.push(score);
                result.push(courseRate);
            }
        }
        result.sort(function (a, b) {
            return b[1] - a[1];
        })
        this.setState({sortedCourses: result});
    }

    calculateScore(course) {
        let score = 0;
        for (const subject of Object.values(this.props.userSubjects)) {
            if (course[1].subject === subject) {
                score += 3;
            }
        }
        for (const keyword of Object.values(this.props.userKeywords)) {
            for (let i = 0; i < course[1].keywords.length; i++) {
                if (course[1].keywords[i] === keyword) {
                    score += 1;
                }
            }
        }
        for (const u_course of Object.values(this.props.userCourses)) {
            if (u_course[1].subject === course[1].subject) {
                score += 2;
            }
            for (let i = 0; i < u_course[1].keywords.length; i++) {
                for (let j = 0; j < course[1].keywords.length; j++) {
                    if (u_course[1].keywords[i] === course[1].keywords[j]) {
                        score += 2;
                    }
                }
            }
        }
        return score;
    }

    render() {
        return (
            <>
                <div
                    style={{
                        marginTop: '5px',
                        marginLeft: '10px',
                        position: 'fixed',
                        height: "93.4%",
                        overflow: 'auto'
                    }}>
                    {this.getCourses()}
                </div>
            </>
        )
    }

}

export default RecommenderCourseArea;
