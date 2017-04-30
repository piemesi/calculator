import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    title     : { type: String },
    text      : { type: String, required: true },
    createdAt : { type: Date }
});

mongoose.model('Action', ActionSchema);
