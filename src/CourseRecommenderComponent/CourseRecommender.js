import React from 'react';
import CourseRecommenderSidebar from "./CourseRecommenderSidebar";
import RecommenderCourseArea from "./RecommenderCourseArea";
import PreviousCourseArea from "./PreviousCourseArea";

class CourseRecommender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likedSubjects: [],
            likedKeywords: [],
            likedCourses: [],
        }
    }

    addUserCourse(selectedCourse) {
        let tmp = this.state.likedCourses;
        let target;
        for (const course of Object.entries(this.props.filteredCourses)) {
            if (course[1].number === selectedCourse) {
                target = course;
            }
        }
        if (tmp.indexOf(target) === -1) {
            tmp.push(target);
        }
        this.setState({likedCourses: tmp});
    }

    removeUserCourse(selectedCourse) {
        let tmp = this.state.likedCourses;
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i][1].number === selectedCourse) {
                tmp.splice(i, 1);
                break;
            }
        }
        this.setState({likedCourses: tmp});
    }

    addUserSubject(selectedSubject) {
        let tmp = this.state.likedSubjects;
        if (tmp.lastIndexOf(selectedSubject) === -1) {
            tmp.push(selectedSubject);
        }
        this.setState({likedSubjects: tmp});
    }

    removeUserSubject(selectedSubject) {
        let tmp = this.state.likedSubjects;
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] === selectedSubject) {
                tmp.splice(i, 1);
                break;
            }
        }
        this.setState({likedSubjects: tmp});
    }

    addUserKeyword(selectedKeyword) {
        let tmp = this.state.likedKeywords;
        if (tmp.lastIndexOf(selectedKeyword) === -1) {
            tmp.push(selectedKeyword);
        }
        this.setState({likedKeywords: tmp});
    }

    removeUserKeyword(selectedKeyword) {
        let tmp = this.state.likedKeywords;
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] === selectedKeyword) {
                tmp.splice(i, 1);
                break;
            }
        }
        this.setState({likedKeywords: tmp});
    }

    render() {
        return (
            <>
                <div>
                    <PreviousCourseArea
                        previousCourses={this.props.previousCourses}
                        addUserCourse={(selectedCourse) => this.addUserCourse(selectedCourse)}
                        removeUserCourse={(selectedCourse) => this.removeUserCourse(selectedCourse)}/>
                </div>
                <div style={{marginLeft: '25vw'}}>
                    <CourseRecommenderSidebar
                        previousSubjects={this.props.previousSubjects}
                        previousKeywords={this.props.previousKeywords}
                        addUserSubject={(selectedSubject) => this.addUserSubject(selectedSubject)}
                        removeUserSubject={(selectedSubject) => this.removeUserSubject(selectedSubject)}
                        addUserKeyword={(selectedKeyword) => this.addUserKeyword(selectedKeyword)}
                        removeUserKeyword={(selectedKeyword) => this.removeUserKeyword(selectedKeyword)}
                    />
                </div>
                <div style={{marginLeft: '45vw'}}>
                    <RecommenderCourseArea
                        style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}
                        filteredCourses={this.props.filteredCourses}
                        previousCourses={this.props.previousCourses}
                        userSubjects={this.state.likedSubjects}
                        userKeywords={this.state.likedKeywords}
                        userCourses={this.state.likedCourses}
                        addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
                </div>
            </>
        );
    }
}

export default CourseRecommender;