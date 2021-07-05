import React from 'react';

class SectionTime extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.day}: {this.props.time}</div>
            </div>
        )
    }
}

export default SectionTime;