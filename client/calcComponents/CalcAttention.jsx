import React from 'react';

import './CalcAttention.less';

const CalcAttention = React.createClass({
    render() {
        return (
            <div className="mdl-grid info-message">{this.props.infoMessage }</div>
        );
    }
});

export default CalcAttention;

