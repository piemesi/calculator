import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Action';

const Action = mongoose.model('Action');

export function setUpConnectionCalc() {
    // mongoose.connect(`mongodb://${config.dbCalc.host}:${config.dbCalc.port}/${config.dbCalc.name}`);
    mongoose.connect(`mongodb://mongo:27017/${config.dbCalc.name}`);
}
// '+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT/${config.dbCalc.name}'
export function listActions(id) {
    return Action.find({}, null, {sort: {createdAt: -1 }})
}

export function createAction(data) {
    const action = new Action({
        title: data.title,
        text: data.text,
        createdAt: new Date()
    });

    return action.save();
}

export function deleteAction(id) {
    return Action.findById(id).remove();
}

