import React from 'react';

class SubsectionTime extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.day}: {this.props.time}</div>
            </div>
        )
    }
}

export default SubsectionTime;