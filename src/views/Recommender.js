import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { TabContent, Preferences, CourseArea } from '../components';

function Recommender(props){
  const { 
    cart, 
    setCart, 
    subjects, 
    allCourses,
    historyCourses,
    keywords,
    dependencies
  } = props;

  const [filteredCourses, setFilteredCourses] = useState([]);
  
  const [preferredSubjects, setPreferredSubjects] = useState([]);
  const [preferredHistorySubjects, setPreferredHistorySubjects] = useState([]);
  const [preferredKeywords, setPreferredKeywords] = useState([]);

  useEffect(() => {
    const filterCourses = () => {
        console.table(preferredHistorySubjects)
        let newFilteredCourses = _.cloneDeep(allCourses);

        newFilteredCourses = newFilteredCourses.filter(course => 
          historyCourses.findIndex(historyCourse => historyCourse.key === course.key) === -1
        )

        newFilteredCourses = newFilteredCourses.filter(course => 
          dependencies.findIndex(key => key === course.key) === -1
        )

        newFilteredCourses.forEach(course => {
          if (preferredSubjects.findIndex(preferredSubject => preferredSubject === course.subject) >= 0) {
            course.rate += 1.5;
          }
          const preferredHistorySubjectsIndex = preferredHistorySubjects.findIndex(preferredHistorySubject => preferredHistorySubject.subject === course.subject);
          if (preferredHistorySubjectsIndex >= 0) {
            course.rate += preferredHistorySubjects[preferredHistorySubjectsIndex].rate;
          }
        });

        newFilteredCourses.forEach(course => {
          course.keywords.forEach(keyword => {
            if (preferredKeywords.findIndex(preferredKeyword => preferredKeyword === keyword) >= 0) {
              course.rate += 0.5;
            } 
          })
        });

        newFilteredCourses.sort((course1, course2) => course2.rate - course1.rate);

        setFilteredCourses(newFilteredCourses);
    }

    if (allCourses.length) filterCourses();
  }, [allCourses, historyCourses, preferredSubjects, preferredKeywords, preferredHistorySubjects]);

  console.table(filteredCourses);

  return (
    <TabContent>
        <div style={{ height: '100%', padding: 8, display: 'flex' }}>
            <Preferences
              subjects={subjects}
              keywords={keywords}
              historyCourses={historyCourses}
              preferredSubjects={preferredSubjects}
              setPreferredSubjects={setPreferredSubjects}
              preferredKeywords={preferredKeywords}
              setPreferredKeywords={setPreferredKeywords}
              preferredHistorySubjects={preferredHistorySubjects}
              setPreferredHistorySubjects={setPreferredHistorySubjects}
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