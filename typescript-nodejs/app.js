"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const route_1 = __importDefault(require("./routes/route"));
const auth_1 = __importDefault(require("./routes/auth"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/public', express_1.default.static('public'));
app.use('/img', route_1.default);
app.use("/user", auth_1.default);
app.use("/posts", route_1.default);
app.get("/", (req, res) => {
    res.send("hello");
});
if (process.env.DataBase_Connection) {
    try {
        mongoose_1.default.connect(process.env.DataBase_Connection, {
            useNewUrlParser: true,
        });
    }
    catch (err) {
        console.log("errr  while connecting db", "errr");
    }
}
app.listen(3000);
