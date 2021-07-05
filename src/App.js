import React from 'react';
import { Tabs, Tab} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'

import { Home } from './views';

function App() {
    return (
        <div className="root">
            <div className="topBar">
                <div xs="auto" style={{ marginLeft: 8 }}>
                    <img src="logo192.png" alt="logo" style={{ height: 50 }}/>
                </div>
                <div style={{ marginLeft: 8, fontSize: 25, color: 'white' }}>Course Search</div>
            </div>
            <div className="mainArea">
                <Tabs defaultActiveKey="home" style={{ margin: '8px'}}>
                    <Tab eventKey="home" title="Search">
                        <Home />
                    </Tab>
                    <Tab eventKey="recommender" title="Recommender">
                    </Tab>
                    <Tab eventKey="planner" title="Planner">
                    </Tab>
                    <Tab eventKey="cart" title="Cart">
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
    
}

export default App;
