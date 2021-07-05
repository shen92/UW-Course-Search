import React from 'react';
import {Card, Carousel, Table} from "react-bootstrap";

class SchedulerView extends React.Component {
    getTable() {
        return (
            <div style={{marginTop: '10px', width: '81%'}}>
                <Table bordered hover>
                    <thead align="center" style={{width: '100px'}}>
                    <tr>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                    </thead>
                    <tbody align="center">
                    <tr>
                        <td>8:00am - 9:00am</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9:00am - 10:00am</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10:00am - 11:00am</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:00am - 12:00pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12:00pm - 1:00pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1:00pm - 2:00pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3:00pm - 4:00pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4:00pm - 5:00pm</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    getSchedules() {
        let tmp = [];
        for (let i = 0; i < 5; i++) {
            tmp.push(<Carousel.Item key={i}>
                <Card
                    style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        marginRight: '10px',
                        height: '580px',
                    }}>
                    <Card.Header><h5>Schedule {(i + 1)} of 5</h5></Card.Header>
                    <div>{this.getTable()}</div>
                </Card>
            </Carousel.Item>);
        }
        return tmp;
    }

    showSchedules() {
        return (<>
            <Carousel autoPlay={false} interval={Number.POSITIVE_INFINITY}>
                {this.getSchedules()}
            </Carousel>
        </>)

    }

    render() {
        return (
            <>
                <Card
                    style={{
                        width: '74%',
                        marginTop: '5px',
                        marginLeft: '10px',
                        marginRight: '5px',
                        height: '93.4%',
                        position: 'fixed',
                        overflow: 'auto'
                    }}>
                    <h4 align="center">Schedules</h4>
                    <div align="center">{this.showSchedules()}</div>
                </Card>
            </>
        );
    }
}

export default SchedulerView;