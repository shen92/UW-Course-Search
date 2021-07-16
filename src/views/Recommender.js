import React, { useState, useEffect } from 'react';

import { TabContent, Preferences, CourseArea } from '../components';

function Recommender(props){
  const { 
    cart, 
    setCart, 
    subjects, 
    allCourses,
    historyCourses
  } = props;

    const [filteredCourses, setFilteredCourses] = useState([]);
    
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchSubject, setSearchSubject] = useState("All");
    const [searchMinCredits, setSearchMinCredits] = useState(-1);
    const [searchMaxCredits, setSearchMaxCredits] = useState(10);

  return (
    <TabContent>
        <div style={{ height: '100%', padding: 8, display: 'flex' }}>
            <Preferences 
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

export default Recommender;