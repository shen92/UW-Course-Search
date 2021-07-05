import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'

import { Home } from './views';

function App() {
    return (
        <Container fluid style={{padding: 0}}>
            <div className="topBar">
                <div xs="auto" style={{marginLeft: 8}}>
                    <img src="logo192.png" alt="logo" style={{height: 50}}/>
                </div>
                <div style={{marginLeft: 8, fontSize: 25, color: 'white'}}>Course Search</div>
            </div>
            <Container fluid style={{marginTop: 8}}>
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
        </Container>
    )
    
}

export default App;
