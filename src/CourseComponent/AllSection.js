import Section from './Section'
import React from 'react';

class AllSection extends React.Component {
    getAllSection() {
        let sections = [];

        for (const section of Object.entries(this.props.data)) {
            sections.push(
                <Section key={section[0]} sectionNumber={section[0]} data={section[1]} courseNumber={this.props.courseNumber}
                         addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}/>
            )
        }

        return sections;
    }

    render() {
        return (
            <div>
                {this.getAllSection()}
            </div>
        )
    }
}

export default AllSection;