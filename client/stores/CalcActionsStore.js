import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/CalcActionConstants';

const CHANGE_EVENT = 'change';

let _calcActions = [];
let _loadingError = null;
let _isLoading = true;

function formatCalcAction(calcAction) {
    return {
        id: calcAction._id,
        title: calcAction.title,
        text: calcAction.text,
        createdAt: calcAction.createdAt
    };
}

const CalcStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getCalcActions() {
        return _calcActions;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_CALC_ACTION_REQUEST: {
            _isLoading = true;

            CalcStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CALC_ACTION_SUCCESS: {
            _isLoading = false;
            _calcActions = action.calcAction.map( formatCalcAction );
            _loadingError = null;

            CalcStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CALC_ACTION_FAIL: {
            _loadingError = action.error;

            CalcStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default CalcStore;
