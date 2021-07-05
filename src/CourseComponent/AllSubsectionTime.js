import SubsectionTime from './SubsectionTime'
import React from 'react';

class AllSubsectionTime extends React.Component {
    getAllSubectionTime() {
        let allSubsectionTime = [];

        for (const subsectionTime of Object.entries(this.props.data)) {
            allSubsectionTime.push(
                <SubsectionTime key={subsectionTime[0]} day={subsectionTime[0]} time={subsectionTime[1]}/>
            )
        }
        return allSubsectionTime;
    }

    render() {
        return (
            <div>
                {this.getAllSubectionTime()}
            </div>
        )
    }
}

export default AllSubsectionTime;