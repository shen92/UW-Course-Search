import Subsection from './Subsection'
import React from 'react';

class AllSubsection extends React.Component {
    getAllSubsection() {
        let allSubsection = [];

        for (const subsection of Object.entries(this.props.data)) {
            allSubsection.push(
                <Subsection key={subsection[0]} name={subsection[0]} data={subsection[1]}
                            courseNumber={this.props.courseNumber}
                            sectionNumber={this.props.sectionNumber}
                            subsectionNumber={subsection[0]}
                            addSelectedCourses={(selectedCourse) => this.props.addSelectedCourses(selectedCourse)}
                />
            )
        }
        return allSubsection;
    }

    render() {
        return (
            <div>
                {this.getAllSubsection()}
            </div>
        );
    }
}

export default AllSubsection;