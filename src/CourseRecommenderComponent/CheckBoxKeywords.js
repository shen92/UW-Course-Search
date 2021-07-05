import React from 'react';

class CheckBoxKeywords extends React.Component {
    changeEvent(event) {
        if (event.target.checked === true) {
            this.props.addUserKeyword(event.target.value);
        } else {
            this.props.removeUserKeyword(event.target.value);
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

export default CheckBoxKeywords;