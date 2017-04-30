import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listCalcActions() {
        return axios.get(`${apiPrefix}/calc-actions`);
    },

    createCalcAction(data) {
        return axios.post(`${apiPrefix}/calc-actions`, data);
    },

    deleteCalcAction(actionId) {
        return axios.delete(`${apiPrefix}/calc-actions/${actionId}`);
    }
}
