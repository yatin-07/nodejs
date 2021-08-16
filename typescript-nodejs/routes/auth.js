"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authrouter = express_1.default.Router();
const users_1 = __importDefault(require("../models/users"));
const validate_1 = __importDefault(require("../models/validate"));
require("joi");
//const {registervalidation} = require('../models/validate')
authrouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate_1.default.validate(req.body);
    if (error)
        res.send(error.details[0].message);
    const user = new users_1.default({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const saveduser = yield user.save();
        res.send(saveduser);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = authrouter;
