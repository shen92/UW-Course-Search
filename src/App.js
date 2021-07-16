import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { Home, Cart } from './views';

import './styles/app.scss'

function App() {
    const [cart, setCart] = useState([]);

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
                        <Home cart={cart} setCart={setCart} />
                    </Tab>
                    <Tab eventKey="recommender" title="Recommender">
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
