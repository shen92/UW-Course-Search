import SectionTime from './SectionTime'
import React from 'react';

class AllSectionTime extends React.Component {
    getAllSectionTime() {
        let allSectionTime = [];

        for (const sectionTime of Object.entries(this.props.data)) {
            allSectionTime.push(
                <SectionTime key={sectionTime[0]} day={sectionTime[0]} time={sectionTime[1]}/>
            )
        }

        return allSectionTime;
    }

    render() {
        return (
            <div>
                {this.getAllSectionTime()}
            </div>
        );
    }
}

export default AllSectionTime;