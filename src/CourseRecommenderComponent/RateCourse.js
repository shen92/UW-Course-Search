import React from 'react';

class RateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: " "
        };
        this.radioChange = this.radioChange.bind(this);
    }

    radioChange(e) {
        this.setState({
            selectedOption: e.currentTarget.value
        });
        if (e.currentTarget.value === "Like") {
            this.props.getRateValue(1);
        }else{
            this.props.getRateValue(0);
        }
    }


    render() {
        return (
            <div>
                <div>
                    <input
                        style={{marginRight: '5px'}}
                        type="radio"
                        value="Like"
                        checked={this.state.selectedOption === "Like"}
                        onChange={this.radioChange}/>Like
                    <input
                        style={{marginLeft: '25px', marginRight: '5px'}}
                        type="radio"
                        value="Dislike"
                        checked={this.state.selectedOption === "Dislike"}
                        onChange={this.radioChange}/>Dislike
                </div>
            </div>
        );
    }
}

export default RateCourse;