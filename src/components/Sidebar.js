import React from 'react';

import { Container, Card, Form } from 'react-bootstrap';

import '../css/components.css'

function Sidebar(props) {
    return (
        <Container fluid className="sidebar">
            <Card.Title>Search and Filter</Card.Title>
            <Form>
                <Form.Group controlId="formKeywords" 
                            style={{width: '100%'}}>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Search" autoComplete="off"/>
                </Form.Group>
                <Form.Check
                    custom
                    type="checkbox"
                    id="custom"
                    label="Search with Tag"
                />
                <p></p>
                <Form.Group controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control as="select">
                    </Form.Control>
                </Form.Group>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Form.Group controlId="minimumCredits" >
                        <Form.Label>Credits</Form.Label>
                        <Form.Control type="text" placeholder="minimum" autoComplete="off"/>
                    </Form.Group>
                    <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                    <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}}>
                        <Form.Control type="text" placeholder="maximum" autoComplete="off"/>
                    </Form.Group>
                </div>
            </Form>
        </Container>
        )
}

export default Sidebar;
