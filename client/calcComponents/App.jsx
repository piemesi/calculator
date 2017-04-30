import React from 'react';

import CalcStore from '../stores/CalcActionsStore';
import CalcActions from '../actions/CalcActions';


import CalcActionsGrid from './CalcsGrid.jsx';
import CalcDisplay from './CalcDisplay.jsx';
import CalcButton from './CalcButton.jsx';
import CalcAttention from './CalcAttention.jsx';

import './Calc.less';

function getStateFromFlux() {
    return {
        isLoading: CalcStore.isLoading(),
        calcActions: CalcStore.getCalcActions(),

    };
}
const buttonMapFirstRow = [
    {'id': 'clc', 'val': 'AC', 'color': 'ac-ce accent-color', 'type': 'clear'},
    {'id': 'shuffle', 'val': '+/-', 'color': 'ac-ce accent-color', 'type': 'skip'},
    {'id': 'procent', 'val': '%', 'color': 'default-primary-color', 'type': 'skip'},
    {'id': 'multiple', 'val': '*', 'color': 'default-primary-color', 'type': 'operand'},
];

const buttonMapSecondRow = [
    {'id': 'seven', 'val': '7', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'eight', 'val': '8', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'nine', 'val': '9', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'minus', 'val': '-', 'color': 'default-primary-color', 'type': 'operand'},
];
const buttonMapThirdRow = [
    {'id': 'four', 'val': '4', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'five', 'val': '5', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'six', 'val': '6', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'plus', 'val': '+', 'color': 'default-primary-color', 'type': 'operand'},
];

const buttonMapFourthRow = [
    {'id': 'one', 'val': '1', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'two', 'val': '2', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'three', 'val': '3', 'color': 'default-primary-color', 'type': 'num'},
    {'id': 'divide', 'val': '/', 'color': 'default-primary-color', 'type': 'operand'},
];

const buttonMapBot = [


    {'id': 'zero', 'val': '0', 'color': 'default-primary-color  zero-sign', 'type': 'num'},
    {'id': 'dot', 'val': '.', 'color': 'default-primary-color', 'type': 'num'},

];

const App = React.createClass({

    infoCooldown(){
        this.setState({
            infoMessage: '',
        });
    },


    handlePress(item) {

        const type = item.target.dataset.type;
        const val = item.target.dataset.value;

        // console.log(val);
        // console.log(type);

        const cur = this.state.cur;
        switch (type) {
            case 'operand':
                const lastLetter = cur.slice(-1);
                const $inVal = (lastLetter === '+' || lastLetter === '-' || lastLetter === '*' || lastLetter === '/')
                    ? cur.slice(0, -1) + val : this.state.cur + val;

                this.setState({
                    cur: $inVal,
                    displayData: $inVal
                });
                break;
            case 'num':
                const $inputVal = this.state.cur === '0' ? val : this.state.cur + val;
                this.setState({
                    cur: $inputVal,

                    displayData: $inputVal
                });

                break;
            case 'clear':

                this.setState({
                    displayData: '',
                    cur: '0'
                });
                break;
            case 'skip':

                this.setState({
                    infoMessage: 'Операция недоступна',
                });

                setTimeout(this.infoCooldown, 2000);
                break;
            case 'submit':

                try {
                    const result = eval(cur) + '';

                    this.setState({
                        displayData: '=' + result,
                        cur: result + ''
                    });

                    const newCalcAction = {
                        title: cur + '=' + result,
                        text: cur + '=' + result,
                    };

                    this.handleCalcActionAdd(newCalcAction);

                } catch (e) {
                    // console.log(e);
                    this.setState({
                        displayData: cur + '=',
                        cur: 'NaN'
                    });
                }

                break;
            default:
                console.log('WAF')
                break;
        }

    },


    getInitialState() {
        var a = getStateFromFlux();
        var b = {displayData: '', cur: '0', infoMessage: ''};


        return Object.assign(a, b);
    },

    componentWillMount() {
        CalcActions.loadActions();
    },

    componentDidMount() {
        CalcStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        CalcStore.removeChangeListener(this._onChange);
    },

    handleCalcActionDelete(calcAction) {
        CalcActions.deleteAction(calcAction.id);
    },

    handleCalcActionAdd(calcActionData) {
        CalcActions.createAction(calcActionData);
    },


    /*onDelete={this.props.onNoteDelete.bind(null, note)}*/

    render() {
        return (
            <div className='App  '>
                <div className=" container">

                    <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                        <div className="mdl-tabs__tab-bar">
                            <a href="#calculator-panel" className="mdl-tabs__tab is-active">Calculator</a>
                            <a href="#history-panel" className="mdl-tabs__tab">History</a>

                        </div>

                        <div className="mdl-tabs__panel is-active" id="calculator-panel">
                            <div className="mdl-cell mdl-cell--6-col">


                                <div className=" primary-text-color unselectable back">
                                    <div className="">
                                        <div className="calculator-buttons flow-text">
                                            <CalcDisplay displayData={this.state.displayData}/>
                                            <CalcAttention infoMessage={this.state.infoMessage}/>
                                            <div className="mdl-grid">
                                                {buttonMapFirstRow.map(
                                                    item => <CalcButton color={item.color}
                                                                        id={item.id}
                                                                        val={item.val}
                                                                        key={item.id}
                                                                        type={item.type}

                                                                        layoutStyle="mdl-cell mdl-cell--3-col firstrow "
                                                                        onPressAction={this.handlePress}

                                                    />
                                                )}
                                            </div>
                                            <div className="mdl-grid">
                                                {buttonMapSecondRow.map(
                                                    item => <CalcButton color={item.color}
                                                                        id={item.id}
                                                                        val={item.val}
                                                                        key={item.id}
                                                                        type={item.type}

                                                                        layoutStyle="mdl-cell mdl-cell--3-col"
                                                                        onPressAction={this.handlePress}

                                                    />
                                                )}
                                            </div>
                                            <div className="mdl-grid">
                                                {buttonMapThirdRow.map(
                                                    item => <CalcButton color={item.color}
                                                                        id={item.id}
                                                                        val={item.val}
                                                                        key={item.id}
                                                                        type={item.type}

                                                                        layoutStyle="mdl-cell mdl-cell--3-col"
                                                                        onPressAction={this.handlePress}

                                                    />
                                                )}
                                            </div>
                                            <div className="mdl-grid">
                                                {buttonMapFourthRow.map(
                                                    item => <CalcButton color={item.color}
                                                                        id={item.id}
                                                                        val={item.val}
                                                                        key={item.id}
                                                                        type={item.type}

                                                                        layoutStyle="mdl-cell mdl-cell--3-col"
                                                                        onPressAction={this.handlePress}

                                                    />
                                                )}
                                            </div>


                                            <div className="mdl-grid">
                                                <CalcButton
                                                    color="default-primary-color  zero-sign mdl-cell mdl-cell--6-col"
                                                    id="zero"
                                                    val="0"
                                                    key="zero"
                                                    type="num"
                                                    layoutStyle=""
                                                    onPressAction={this.handlePress}
                                                />

                                                <CalcButton color="default-primary-color    mdl-cell mdl-cell--3-col"
                                                            id="dot"
                                                            val="."
                                                            key="dot"
                                                            type="num"
                                                            layoutStyle=""
                                                            onPressAction={this.handlePress}
                                                />

                                                <CalcButton
                                                    color="default-primary-color    mdl-cell mdl-cell--3-col equalBtn mdl-cell"
                                                    id="equal-sign"
                                                    val="="
                                                    key="equal-sign"
                                                    type="submit"
                                                    layoutStyle=""
                                                    onPressAction={this.handlePress}
                                                />


                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="mdl-tabs__panel" id="history-panel">


                            <ul>
                                <CalcActionsGrid calcActions={this.state.calcActions}
                                                 onCalcActionDelete={this.handleCalcActionDelete}/>

                            </ul>
                        </div>

                    </div>


                </div>

            </div>



        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
