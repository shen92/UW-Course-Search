import React from 'react';
import { Container } from 'react-bootstrap';

import { CourseCard } from '../components';

import '../css/components.css'

function CourseArea(props) {
    const { filteredCourses } = props;

    const renderFilteredCourses = () => {
        let courses = [];
        for (const item of Object.entries(filteredCourses)) {
            const courseKey = item[0];
            const course = item[1]
            courses.push(
                <CourseCard key={courseKey} course={course}/>
            );
        }
        return courses;
    }

    return (
        <div className="courseArea">
            {renderFilteredCourses()}
        </div>
    )
}

export default CourseArea;
