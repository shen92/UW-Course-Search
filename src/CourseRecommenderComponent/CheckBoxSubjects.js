import React from 'react';

class CheckBoxSubjects extends React.Component {

    changeEvent(event) {
        if (event.target.checked === true) {
            this.props.addUserSubject(event.target.value);
        } else {
            this.props.removeUserSubject(event.target.value);
        }
    }

    render() {
        let outputCheckboxes = this.props.options.map(function (string, i) {
            return (<div key={i}>
                <input
                    style={{marginRight: '5px'}}
                    type="checkbox"
                    id={'string_' + i}
                    value={string}
                    onChange={this.changeEvent.bind(this)}/>
                <label htmlFor={'string_' + i}>{string}
                </label>
            </div>)
        }, this);

        return (
            <div>
                <div>
                    {outputCheckboxes}
                </div>
            </div>
        )
    }

}

export default CheckBoxSubjects;