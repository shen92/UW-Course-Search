import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { Home, Cart, Recommender } from './views';

import './styles/app.scss'

function App() {
    const [subjects, setSubjects] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [historyCourses, setHistoryCourses] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getSubjects = (data) => {
            let subjects = new Set();
            for (const course of Object.values(data)) {
                subjects.add(course.subject)
            }
            return ["All", ...subjects];
        }

        const getCourses = (data) => {
            let courses = [];
            for (const course of Object.entries(data)) {
                courses.push({...course[1], key: course[0], rate: 0});
            }
            courses.sort((course1, course2) => course1.credits - course2.credits);
            return courses;
        }

        const courses = require('./courses.json');
        const history = require('./history.json');
        setAllCourses(getCourses(courses));
        setHistoryCourses(getCourses(history));
        setSubjects(getSubjects(courses));
    }, []);

    return (
        <div className="root">
            <div className="topBar">
                <div xs="auto" style={{ marginLeft: 8 }}>
                    <img src="logo192.png" alt="logo" style={{ height: 50 }}/>
                </div>
                <div style={{ marginLeft: 8, fontSize: 25, color: 'white' }}>Course Search</div>
            </div>
            <div className="mainArea">
                <Tabs defaultActiveKey="home" style={{ margin: '8px' }}>
                    <Tab eventKey="home" title="Search">
                        <Home
                            subjects={subjects}
                            allCourses={allCourses}
                            cart={cart}
                            setCart={setCart} 
                        />
                    </Tab>
                    <Tab eventKey="recommender" title="Recommender">
                        <Recommender
                            subjects={subjects}
                            allCourses={allCourses}
                            historyCourses={historyCourses}
                            cart={cart}
                            setCart={setCart}
                        />
                    </Tab>
                    <Tab eventKey="planner" title="Planner">
                    </Tab>
                    <Tab eventKey="cart" title="Cart">
                        <Cart cart={cart} setCart={setCart} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
    
}

export default App;
