"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CounterSchema = new mongoose_1.default.Schema({
    counter: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        //required: true,
        enum: ["ORDER"],
    },
});
exports.default = mongoose_1.default.model("counter", CounterSchema);
