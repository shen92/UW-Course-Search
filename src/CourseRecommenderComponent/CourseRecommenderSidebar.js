import React from 'react';
import {Card} from 'react-bootstrap';
import PreferenceFilter from "./PreferenceFilter";

class CourseRecommenderSidebar extends React.Component {
    render() {
        return (
            <>
                <Card style={{
                    width: '20%',
                    marginLeft: '10px',
                    marginTop: '5px',
                    height: '93.4%',
                    position: 'fixed',
                    overflow: 'auto'
                }}>
                    <PreferenceFilter
                        previousSubjects={this.props.previousSubjects}
                        previousKeywords={this.props.previousKeywords}
                        addUserSubject={(selectedSubject) => this.props.addUserSubject(selectedSubject)}
                        removeUserSubject={(selectedSubject) => this.props.removeUserSubject(selectedSubject)}
                        addUserKeyword={(selectedKeyword) => this.props.addUserKeyword(selectedKeyword)}
                        removeUserKeyword={(selectedKeyword) => this.props.removeUserKeyword(selectedKeyword)}
                        />
                </Card>
            </>
        );
    }
}

export default CourseRecommenderSidebar;