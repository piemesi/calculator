import React from 'react';
import CalcItem from './CalcItem.jsx';

import Masonry from 'react-masonry-component';

import './CalcsGrid.less';

const CalcActionsGrid = React.createClass({
    render() {
        const masonryOptions = {
            itemSelector: '.ButtonItem',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true,

        };

        return (
            <Masonry
                className='CalcActionsGrid'
                options={masonryOptions}
            >
                {
                    this.props.calcActions.map(calcItem =>
                        <CalcItem
                            key={calcItem.id}
                            title={calcItem.title}
                            color="white"
                            createdAt={calcItem.createdAt}
                            onDelete={this.props.onCalcActionDelete.bind(null, calcItem)}
                        >
                            {calcItem.text}
                        </CalcItem>
                    )
                }
            </Masonry>
        );
    }
});

export default CalcActionsGrid;
