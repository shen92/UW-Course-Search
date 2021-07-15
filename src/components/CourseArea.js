import React from 'react';
import PropTypes from 'prop-types';

import { CourseCard } from '../components';

import '../css/components.css'

function CourseArea(props) {
    const { filteredCourses } = props;

    return (
        <div className="courseArea">
            {filteredCourses.map(course =>  <CourseCard key={course.key} course={course}/>)}
        </div>
    )
}

CourseArea.props = {
    filteredCourses: PropTypes.array.isRequired,
}

export default CourseArea;
