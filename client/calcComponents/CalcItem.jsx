import React from 'react';

import './CalcItem.less';

const ButtonItem = React.createClass({

    render() {
        const style = {backgroundColor: this.props.color};

        return (
            <div className='CalcItem' style={style}>
                <span className='CalcItem__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.title
                        ?
                        <h6 className='CalcItem__title'>{this.props.createdAt}</h6>
                        :
                        null
                }
                <div className='CalcItem__text'>{this.props.children}</div>
            </div>
        );
    }
});

export default ButtonItem;
