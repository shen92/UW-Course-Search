import React from 'react';
import '../App.css';
import Course from '../CourseComponent/Course';

class SearchCourseArea extends React.Component {
    getCourses() {
        let courses = [];
        for (const course of Object.entries(this.props.filteredCourses)) {
            courses.push(
                <Course key={course[0]} data={course[1]}
                        addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
            )
        }
        return courses;
    }

    render() {
        return (
            <>
                <div style={{margin: '5px', position: 'fixed', height: "93.4%", overflow: 'auto'}}>
                    {this.getCourses()}
                </div>
            </>
        )
    }

}

export default SearchCourseArea;
