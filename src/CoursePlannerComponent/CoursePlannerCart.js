import React from 'react';
import {Card} from "react-bootstrap";
import PlannerCartItem from "./PlannerCartItem";

class CoursePlannerCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
        }
    }

    componentWillReceiveProps() {
        this.setCartStatus();
    }

    setCartStatus() {
        let size = this.props.cartCourses.length;
        size === 0 ? this.setState(
            {isEmpty: true}
        ) : this.setState(
            {isEmpty: false}
        )
    }
    getCourses() {
        let courses = [];
        let i = 0;
        for (const course of Object.values(this.props.cartCourses)) {
            courses.push(
                <React.Fragment key={i}>
                    <PlannerCartItem
                        courseNumber={course[0]}
                        courseSectionNumber={course[1]}
                        courseSubsectionNumber={course[2]}/>
                </React.Fragment>
            )
            i++;
        }
        return courses;
    }

    render() {
        return (
            <>
                <Card style={{
                    width: '25%',
                    marginTop: '5px',
                    marginLeft: '5px',
                    marginRight: '5px',
                    height: '93.4%',
                    position: 'fixed',
                    overflow: 'auto'
                }}>
                    <h4 align="center">Cart</h4>
                    <div>{this.state.isEmpty ?
                        <div align="center">Your cart is empty.</div> : this.getCourses()}</div>
                </Card>
            </>
        );
    }
}

export default CoursePlannerCart;