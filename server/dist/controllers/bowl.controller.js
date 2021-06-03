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
exports.BowlController = void 0;
const express_1 = require("express");
const bowl_service_1 = require("../services/bowl.service");
const auth_middleware_1 = require("../helpers/middlewares/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class BowlController {
    constructor() {
        this.router = express_1.Router();
        this.service = new bowl_service_1.BowlService();
        this.storage = multer_1.default.diskStorage({
            destination: function (_, __, cb) {
                cb(null, 'uploads/');
            },
            filename: function (_, file, cb) {
                cb(null, Date.now() + path_1.default.extname(file.originalname));
            }
        });
        this.upload = multer_1.default({ storage: this.storage });
        this.routing();
    }
    index(req, res) {
        req.body;
        res.send('hello world from bowl ');
    }
    createBowl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const resp = yield this.service.createBowl(input);
            return res.send(resp).json();
        });
    }
    createBowlGrocery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const resp = yield this.service.createBowlGrocery(input);
            return res.send(resp).json();
        });
    }
    getBowlGroceryCategories(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send(yield this.service.getBowlGroceriesCategory()).json();
        });
    }
    getBowls(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send(yield this.service.getBowls()).json();
        });
    }
    getBowlElements(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send(yield this.service.getBowlElements()).json();
        });
    }
    routing() {
        this.router.post('/create-grocery', (req, res, next) => auth_middleware_1.isAuth(req, res, next), this.upload.single('image'), (req, res) => this.createBowlGrocery(req, res));
        this.router.get('/categories', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.getBowlGroceryCategories(res));
        this.router.post('/create', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.createBowl(req, res));
        this.router.get('/bowls', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.getBowls(res));
        this.router.post('/bowl-elements', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.getBowlElements(res));
    }
}
exports.BowlController = BowlController;
//# sourceMappingURL=bowl.controller.js.map