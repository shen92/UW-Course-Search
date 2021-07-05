import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../components';

import '../css/home.css'

function Home() {
    const [courses, setCourses] = useState({});

    useEffect(() => {
        const data = require('../courses.json');
        const history = require('../history.json');
        setCourses(data);
        // setHistory(history);
    }, [])

        return (
            <Container fluid className="home" >
                <Row style={{height: '100%'}} >
                    <Col xs={2} style={{height: '100%'}} >
                        <Sidebar/>
                    </Col>
                    <Col xs={10}>Main Content</Col>
                </Row>
            </Container>
        );
}


export default Home;