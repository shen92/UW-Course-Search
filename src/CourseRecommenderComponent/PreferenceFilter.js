import React from 'react';
import {Nav, Spinner} from 'react-bootstrap'
import CheckBoxSubjects from "./CheckBoxSubjects";
import CheckBoxKeywords from "./CheckBoxKeywords";

class PreferenceFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wait: true
        }
    }

    componentWillReceiveProps() {
        this.setState({
            wait: this.props.previousSubjects.length === 0 && this.props.previousKeywords.length === 0
        })
    }

    getSubjects() {
        return (
            <>
                <CheckBoxSubjects
                    options={this.props.previousSubjects}
                    addUserSubject={(selectedSubject) => this.props.addUserSubject(selectedSubject)}
                    removeUserSubject={(selectedSubject) => this.props.removeUserSubject(selectedSubject)}
                />
            </>
        )
    }

    getKeywords() {
        return (
            <>
                <CheckBoxKeywords
                    options={this.props.previousKeywords}
                    addUserKeyword={(selectedKeyword) => this.props.addUserKeyword(selectedKeyword)}
                    removeUserKeyword={(selectedKeyword) => this.props.removeUserKeyword(selectedKeyword)}
                />
            </>
        )
    }

    wait() {
        return (
            <Nav className="justify-content-center">
                <Spinner style={{marginTop: '15px', marginBottom: '25px'}} animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Nav>
        )
    }

    render() {
        return (
            <>
                <div style={{marginLeft: '25px'}}>
                    <h4 align="center">Preference</h4>
                    <h5 style={{marginTop: '20px', marginBottom: '5px'}}>Subject</h5>
                    <>
                        {this.state.wait ? this.wait() : this.getSubjects()}
                    </>
                    <h5 style={{marginTop: '20px', marginBottom: '5px'}}>Keyword</h5>
                    <>
                        {this.state.wait ? this.wait() : this.getKeywords()}
                    </>
                </div>
            </>
        );
    }
}

export default PreferenceFilter;