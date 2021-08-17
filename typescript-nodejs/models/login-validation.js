"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const loginschema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});
exports.default = loginschema;
