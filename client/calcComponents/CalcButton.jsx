import React from 'react';

const CalcButton = React.createClass({

    render() {
        const style = "" +
            "" +
            "waves-effect button btnClick center " + this.props.color + " " + this.props.layoutStyle;

        const el = '';
        if (this.props.type === 'skip') {
            const el = '<div class="mdl-tooltip" data-mdl-for="' + this.props.id + '"> Операция недоступна </div>';
        }

        return (

            <div onClick={this.props.onPressAction} data-type={this.props.type} data-value={this.props.val}
                 className={style}>
                <span id={this.props.id} data-type={this.props.type}
                      data-value={this.props.val}>{this.props.val}</span>{el}</div>
        );
    }
});

export default CalcButton;


