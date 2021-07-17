import React, { useState, useEffect } from 'react';

import { TabContent, Sidebar, CourseArea } from '../components';

function Home(props) {
    const { cart, setCart, subjects, allCourses } = props;

    const [filteredCourses, setFilteredCourses] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchSubject, setSearchSubject] = useState("All");
    const [searchMinCredits, setSearchMinCredits] = useState(-1);
    const [searchMaxCredits, setSearchMaxCredits] = useState(10);

    useEffect(() => {
        const filterCourses = () => {
            let courses = [...allCourses];
            
            if (searchKeyword.length > 0) {
                courses = courses.filter(course => course.keywords.indexOf(searchKeyword.toLowerCase()) > -1);
            }

            if (searchSubject !== 'All') {
                courses = courses.filter(course => course.subject === searchSubject);
            }
            courses = courses.filter(course => course.credits >= searchMinCredits);
            courses = courses.filter(course => course.credits <= searchMaxCredits);

            courses.sort((course1, course2) => course1.credits - course2.credits);
            setFilteredCourses([...courses]);
        }
        
        if (allCourses.length) filterCourses();
    }, [allCourses, searchKeyword, searchSubject, searchMinCredits, searchMaxCredits]);

    return (
        <TabContent>
            <div style={{ height: '100%', padding: 8, display: 'flex' }}>
                <Sidebar 
                    subjects={subjects}
                    setSearchKeyword={setSearchKeyword}
                    setSearchSubject={setSearchSubject}
                    setSearchMinCredits={setSearchMinCredits}
                    setSearchMaxCredits={setSearchMaxCredits}
                />
                <CourseArea 
                    filteredCourses={filteredCourses}
                    cart={cart}
                    setCart={setCart}
                />
            </div>
        </TabContent>
    );
}


export default Home;