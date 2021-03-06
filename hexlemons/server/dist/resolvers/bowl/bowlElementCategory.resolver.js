"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BowlElementCategoryResolver = void 0;
const BowlElement_1 = require("../../entity/BowlElement");
const User_1 = require("../../entity/User");
const type_graphql_1 = require("type-graphql");
const BowlElementCategories_1 = require("../../entity/BowlElementCategories");
const auth_mw_1 = require("../../helpers/middlewares/auth.mw");
let BowlElementCategoryResolver = class BowlElementCategoryResolver {
    bowlElementCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield BowlElementCategories_1.BowlElementCategory.find();
            return categories;
        });
    }
    bowlElementWithCateogry(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: ctx.payload.userId } });
            if (!user) {
                console.log("User not found !");
                return [];
            }
            const elements = yield BowlElement_1.BowlElement.find({ where: { user: user }, relations: ['category'] });
            return elements;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [BowlElementCategories_1.BowlElementCategory]),
    type_graphql_1.UseMiddleware(auth_mw_1.isUserAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BowlElementCategoryResolver.prototype, "bowlElementCategories", null);
__decorate([
    type_graphql_1.Query(() => [BowlElement_1.BowlElement]),
    type_graphql_1.UseMiddleware(auth_mw_1.isUserAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BowlElementCategoryResolver.prototype, "bowlElementWithCateogry", null);
BowlElementCategoryResolver = __decorate([
    type_graphql_1.Resolver()
], BowlElementCategoryResolver);
exports.BowlElementCategoryResolver = BowlElementCategoryResolver;
//# sourceMappingURL=bowlElementCategory.resolver.js.map