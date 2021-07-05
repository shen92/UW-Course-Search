import React from 'react';
import {Card} from 'react-bootstrap';
import RateCourse from "./RateCourse";

class PreviousCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isPreferredCourse: false}
    }

    getRateValue(rate) {
        if (rate === 1) {
            this.setState({isPreferredCourse: true});
            this.props.addUserCourse(this.props.data.number);
        } else if (rate === 0) {
            this.props.removeUserCourse(this.props.data.number);
        }
    }

    render() {
        return (
            <>
                <Card style={{marginLeft: '5px', marginRight: '5px', marginBottom: '5px', height: '100px'}}>
                    <div style={{marginLeft: '7px', marginRight: '7px'}}>
                        <h6 style={{marginTop: '5px'}}>{this.props.data.number}</h6>
                        <p>{this.props.data.name}</p>
                        <RateCourse getRateValue={(rate) => this.getRateValue(rate)}/>
                    </div>
                </Card>
            </>
        );
    }
}

export default PreviousCourse;