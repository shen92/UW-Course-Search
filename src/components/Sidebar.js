import React from 'react';
import PropTypes from 'prop-types';

import { Container, Card, Form } from 'react-bootstrap';

import '../css/components.css'

function Sidebar(props) {
    const { subjects } = props;

    return (
        <Card className="sidebar">
            <Card.Title>Search and Filter</Card.Title>
            <Form>
                <Form.Group controlId="formKeywords" 
                            style={{width: '100%'}}>
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="text" placeholder="Search" autoComplete="off"/>
                </Form.Group>

                <Form.Group controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control as="select">
                        { subjects.map(subject => <option key={subject}>{subject}</option>) }
                    </Form.Control>
                </Form.Group>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Form.Group controlId="minimumCredits" >
                        <Form.Label>Credits</Form.Label>
                        <Form.Control type="text" placeholder="min" autoComplete="off"/>
                    </Form.Group>
                    <div style={{marginLeft: 5, marginRight: 5, marginTop: 13}}>to</div>
                    <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}}>
                        <Form.Control type="text" placeholder="max" autoComplete="off"/>
                    </Form.Group>
                </div>
            </Form>
        </Card>
    )
}

Sidebar.props = {
    subjects: PropTypes.array.isRequired,
    searchKeyword: PropTypes.string.isRequired,
    setSearchKeyword: PropTypes.func.isRequired,
    searchSubject: PropTypes.string.isRequired,
    setSearchSubject: PropTypes.func.isRequired,
    searchMinCredits: PropTypes.string.isRequired,
    setSearchMinCredits: PropTypes.func.isRequired,
    searchMaxCredits: PropTypes.string.isRequired,
    setSearchMaxCredits: PropTypes.func.isRequired,
}

export default Sidebar;
