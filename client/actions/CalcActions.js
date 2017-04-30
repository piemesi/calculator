import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/CalcActionConstants';

import api from '../api';

const CalcActions = {
    loadActions() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_CALC_ACTION_REQUEST
        });

        api.listCalcActions()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CALC_ACTION_SUCCESS,
                calcAction: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CALC_ACTION_FAIL,
                error: err
            })
        );
    },

    createAction(calcAction) {
        api.createCalcAction(calcAction)
        .then(() =>
            this.loadActions()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteAction(calcActionId) {
        api.deleteCalcAction(calcActionId)
        .then(() =>
            this.loadActions()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default CalcActions;
