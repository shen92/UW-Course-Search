import React from 'react';
import PropTypes from 'prop-types';

import { CourseCard } from '../components';

import '../styles/components.scss'

function CourseArea(props) {
    const { filteredCourses, cart, setCart } = props;

    return (
        <div className="courseArea">
            {filteredCourses.length ? 
                filteredCourses.map(course =>  
                    <CourseCard 
                        key={course.key}
                        course={course}
                        cart={cart}
                        setCart={setCart}
                    />
                ) : 
                <div 
                    style={{
                        fontSize: 18, 
                        color: 'darkgray',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    No results.
                </div>
        }
        </div>
    )
}

CourseArea.props = {
    filteredCourses: PropTypes.array.isRequired,
}

export default CourseArea;
