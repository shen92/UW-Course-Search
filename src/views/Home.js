import React, { useState, useEffect } from 'react';

import { TabContent, Sidebar, CourseArea} from '../components';

function Home() {
    const [subjects, setSubjects] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState({});
    
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchSubject, setSearchSubject] = useState("");
    const [searchMinCredits, setSearchMinCredits] = useState(0);
    const [searchMaxCredits, setSearchMaxCredits] = useState(0);

    useEffect(() => {
        const getSubjects = (data) => {
            let subjects = new Set();
            for (const course of Object.values(data)) {
                subjects.add(course.subject)
            }
            setSubjects([...subjects]);
        }

        const data = require('../courses.json');
        setFilteredCourses(data);
        getSubjects(data);
    }, []);

    useEffect(() => {

    }, [searchKeyword, searchSubject, searchMinCredits, searchMaxCredits]);

    return (
        <TabContent>
            <div style={{ height: '100%', padding: 8, display: 'flex' }}>
                <Sidebar 
                    subjects={subjects}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    searchSubject={searchSubject}
                    setSearchSubject={setSearchSubject}
                    searchMinCredits={searchMinCredits}
                    setSearchMinCredits={setSearchMinCredits}
                    searchMaxCredits={searchMaxCredits}
                    setSearchMaxCredits={setSearchMaxCredits}
                />
                <CourseArea filteredCourses={filteredCourses}/>
            </div>
        </TabContent>
    );
}


export default Home;