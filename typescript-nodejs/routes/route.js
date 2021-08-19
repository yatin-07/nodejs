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
const router = express_1.default.Router();
const dbmodel_1 = __importDefault(require("../models/dbmodel"));
const counter_1 = __importDefault(require("../models/counter"));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield dbmodel_1.default.find();
        res.json(posts);
    }
    catch (err) {
        res.json({
            message: err,
        });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var latestCounter = yield counter_1.default.findOne({ type: "ORDER" });
    console.log(latestCounter);
    const counters = ((latestCounter === null || latestCounter === void 0 ? void 0 : latestCounter.counter) || 0) + 1;
    console.log(counters);
    const count = {
        counter: counters,
        type: "ORDER",
    };
    const count1 = new counter_1.default(count);
    count1.save();
    yield counter_1.default.findOneAndUpdate({ type: "ORDER" }, { counter: counters }, { returnOriginal: false });
    //if(latestCounter===null)
    //latestCounter=0;
    //console.log(latestCounter);
    //else
    // latestCounter = latestCounter++;
    console.log(latestCounter);
    const post = new dbmodel_1.default({
        orderNo: counters,
        date: req.body.date,
        price: req.body.price,
        item: req.body.item,
    });
    post
        .save()
        .then((data) => {
        res.json(data);
    })
        .catch((err) => {
        res.json({
            message: err,
        });
    });
    // mongoose.set('returnOriginal', false);
}));
router.get("/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield dbmodel_1.default.findById(req.params.postId);
        res.json(post);
    }
    catch (err) {
        res.json({
            message: err,
        });
    }
}));
router.delete("/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removedpost = yield dbmodel_1.default.remove({ _id: req.params.postId });
        res.json(removedpost);
    }
    catch (err) {
        res.json({
            message: err,
        });
    }
}));
exports.default = router;
