import React from 'react';
import CartItem from './CartItem';
import {Card} from 'react-bootstrap';

class CourseCart extends React.Component {
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
                    <CartItem
                        courseNumber={course[0]}
                        courseSectionNumber={course[1]}
                        courseSubsectionNumber={course[2]}
                        removeSelectedCourse={(selectedCourse) => this.props.removeSelectedCourse(selectedCourse)}
                        removeSelectedSection={(selectedCourse, selectedSection) => this.props.removeSelectedSection(selectedCourse, selectedSection)}
                        removeSelectedSubsection={(selectedCourse, selectedSection, selectedSubsection) => this.props.removeSelectedSubsection(selectedCourse, selectedSection, selectedSubsection)}/>
                </React.Fragment>
            )
            i++;
        }
        return courses;
    }

    render() {
        return (
            <div style={{marginLeft: '25vw'}}>
                <Card
                    style={{margin: '5px', position: 'fixed', width: '50%', height: "93.4%", overflow: 'auto'}}>
                    <h3 align="center">Cart</h3>
                    <div>{this.state.isEmpty ?
                        <div align="center">Your cart is empty.</div> : this.getCourses()}</div>
                </Card>
            </div>
        )
    }
}

export default CourseCart;