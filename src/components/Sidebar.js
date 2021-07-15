import React from 'react';
import PropTypes from 'prop-types';

import { Card, Form } from 'react-bootstrap';

import '../css/components.css'

function Sidebar(props) {
    const { 
        subjects,
        setSearchKeyword,
        setSearchSubject,
        setSearchMinCredits,
        setSearchMaxCredits
    } = props;

    const onSearchTextInputChange = (e) => {
        setSearchKeyword(e.currentTarget.value);
    }

    const onSubjectSelectChange = (e) => {
        setSearchSubject(e.currentTarget.value)
    }

    const onMinCreditsInputChange = (e) =>{
        const value = parseInt(e.currentTarget.value);
        if (!isNaN(value))
            setSearchMinCredits(value);
        else
            setSearchMinCredits(-1);
    }

    const onMaxCreditsInputChange = (e) => {
        const value = parseInt(e.currentTarget.value);
        if (!isNaN(value)) 
            setSearchMaxCredits(value);
        else
            setSearchMaxCredits(10);
    }

    return (
        <Card className="sidebar">
            <Card.Title>Search and Filter</Card.Title>
            <Form>
                <Form.Group 
                    controlId="formKeywords" 
                    style={{width: '100%'}}
                >
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Search" 
                        autoComplete="off" 
                        onChange={(e) => onSearchTextInputChange(e)}
                        // value={searchKeyword}
                    />
                </Form.Group>

                <Form.Group controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                        as="select" 
                        onChange={(e) => onSubjectSelectChange(e)}
                        // value={searchSubject}
                    >
                        { subjects.map(subject => <option key={subject}>{subject}</option>) }
                    </Form.Control>
                </Form.Group>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Form.Group controlId="minimumCredits" >
                        <Form.Label>Credits</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="min" 
                            autoComplete="off"
                            onChange={(e) => onMinCreditsInputChange(e)}
                            // value={searchMinCredits}
                        />
                    </Form.Group>
                    <div style={{marginLeft: 5, marginRight: 5, marginTop: 13}}>to</div>
                    <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}}>
                        <Form.Control 
                            type="text"
                            placeholder="max" 
                            autoComplete="off"
                            onChange={(e) => onMaxCreditsInputChange(e)}
                            // value={searchMaxCredits}
                        />
                    </Form.Group>
                </div>
            </Form>
        </Card>
    )
}

Sidebar.props = {
    subjects: PropTypes.array.isRequired,
    setSearchKeyword: PropTypes.func.isRequired,
    setSearchSubject: PropTypes.func.isRequired,
    setSearchMinCredits: PropTypes.func.isRequired,
    setSearchMaxCredits: PropTypes.func.isRequired,
}

export default Sidebar;
