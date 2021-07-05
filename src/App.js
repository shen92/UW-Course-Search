import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'

import { Home } from './views';

function App() {
    return (
        <Container fluid>
            <div className="topBar">
                <div xs="auto">
                    <img src="logo.png" alt="logo" style={{height: 50}}/>
                </div>
                <div style={{marginLeft: 16, fontSize: 25, fontWeight: 700, color: '#c5050c'}}>Course Search</div>
            </div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    <Home/>
                </Tab>
                <Tab eventKey="recommender" title="Recommender">
                </Tab>
                <Tab eventKey="planner" title="Planner">
                    
                </Tab>
                <Tab eventKey="cart" title="Cart">
                    
                </Tab>
            </Tabs>
        </Container>
    )
    
}

export default App;
