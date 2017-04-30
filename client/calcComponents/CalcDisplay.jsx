import React from 'react';

const CalcDisplay = React.createClass({
    render() {
        return (
            <div className="col l12 m12 s12 display default-primary-color text-primary-color right-align" id="display">
                {this.props.displayData }</div>
        );
    }
});

export default CalcDisplay;