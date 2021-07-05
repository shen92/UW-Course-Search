import React from 'react';
import CoursePlannerCart from "./CoursePlannerCart";
import SchedulerView from "./SchedulerView";

class CoursePlanner extends React.Component {
    render() {
        return (
            <>
                <div>
                    <CoursePlannerCart
                        cartCourses={this.props.cartCourses}
                    />
                </div>
                <div style={{marginLeft: '25vw'}}>
                    <SchedulerView
                        style={{width: '100%', marginTop: '20px', marginBottom: '5px'}}/>
                </div>
            </>
        );
    }
}

export default CoursePlanner;