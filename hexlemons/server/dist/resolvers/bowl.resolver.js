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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BowlResolver = void 0;
const bowl_input_1 = require("../helpers/inputs/bowl.input");
const type_graphql_1 = require("type-graphql");
let BowlResolver = class BowlResolver {
    helloBowl() {
        return 'hello bowl makers!';
    }
    createBowlElement(data) {
        console.log('data => ', data);
        return true;
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BowlResolver.prototype, "helloBowl", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('data', () => bowl_input_1.CreateBowlElementInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bowl_input_1.CreateBowlElementInput]),
    __metadata("design:returntype", Boolean)
], BowlResolver.prototype, "createBowlElement", null);
BowlResolver = __decorate([
    type_graphql_1.Resolver()
], BowlResolver);
exports.BowlResolver = BowlResolver;
//# sourceMappingURL=bowl.resolver.js.map