import React, { useState, useEffect } from 'react';

import { TabContent, Sidebar, CourseArea } from '../components';

function Home(props) {
    const { cart, setCart } = props;

    const [subjects, setSubjects] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchSubject, setSearchSubject] = useState("All");
    const [searchMinCredits, setSearchMinCredits] = useState(-1);
    const [searchMaxCredits, setSearchMaxCredits] = useState(10);

    useEffect(() => {
        const getSubjects = (data) => {
            let subjects = new Set();
            for (const course of Object.values(data)) {
                subjects.add(course.subject)
            }
            setSubjects(["All", ...subjects]);
        }

        const getCourses = (data) => {
            let courses = [];
            for (const course of Object.entries(data)) {
                courses.push({...course[1], key: course[0]});
            }
            courses.sort((course1, course2) => course1.credits - course2.credits);
            setFilteredCourses(courses);
            setAllCourses(courses);
        }


        const data = require('../courses.json');
        getCourses(data);
        getSubjects(data);
    }, []);

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