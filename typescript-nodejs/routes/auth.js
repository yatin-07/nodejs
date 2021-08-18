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
require("dotenv").config();
var bcrypt = require("bcryptjs");
const login_validation_1 = __importDefault(require("../models/login-validation"));
var jwt = require('jsonwebtoken');
authrouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validating the data
    const { error } = validate_1.default.validate(req.body);
    if (error)
        return res.send(error.details[0].message);
    //checking the user
    const emailexist = yield users_1.default.findOne({ email: req.body.email });
    if (emailexist)
        return res.status(400).send("email alread exist");
    //password
    var salt = yield bcrypt.genSalt(10);
    var hashPassword = yield bcrypt.hash(req.body.password, salt);
    // creating a new user
    const user = new users_1.default({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const saveduser = yield user.save();
        res.send(saveduser);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
//login
authrouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validating the data
    const { error } = login_validation_1.default.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //checking the user email
    const user = yield users_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("email not exist");
    //checking the password
    const validpassword = yield bcrypt.compare(req.body.password, user.password);
    if (!validpassword)
        return res.status(400).send("invalid password");
    //token
    const token = jwt.sign({ _id: user._id }, process.env.token_sec);
    res.send("logged in");
}));
exports.default = authrouter;
