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
exports.BowlElementResolver = void 0;
const fs_1 = require("fs");
const bowl_input_1 = require("../../helpers/inputs/bowl.input");
const type_graphql_1 = require("type-graphql");
const BowlElement_1 = require("../../entity/BowlElement");
const BowlElementCategories_1 = require("../../entity/BowlElementCategories");
const User_1 = require("../../entity/User");
const default_response_1 = require("../../helpers/responses/default.response");
const auth_mw_1 = require("../../helpers/middlewares/auth.mw");
let BowlElementResolver = class BowlElementResolver {
    helloBowl() {
        return 'hello bowl makers!';
    }
    createBowlElement(data, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.title || !data.category || !data.image || !data.calories) {
                return {
                    status: false,
                    message: 'invalid data to create this element!'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: ctx.payload.userId } });
            if (!user) {
                return {
                    status: false,
                    message: "We can't find your account that's crazy right!"
                };
            }
            const file = yield data.image;
            const image = `/uploads/${Date.now()}-${file.filename}`;
            const bowlElement = new BowlElement_1.BowlElement();
            const bowl_elemet_category = yield BowlElementCategories_1.BowlElementCategory.findOne({ where: { id: Number(data.category) } });
            if (!bowl_elemet_category) {
                return {
                    status: false,
                    message: 'Category not valid to create this element!'
                };
            }
            bowlElement.title = data.title;
            bowlElement.category = bowl_elemet_category;
            bowlElement.image = image;
            bowlElement.calories = Number(data.calories);
            bowlElement.user = user;
            yield bowlElement.save();
            file.createReadStream().pipe(fs_1.createWriteStream(__dirname + `/../..${image}`).on('ready', () => console.log('re')));
            return {
                status: true,
                message: 'Element created successfuly'
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BowlElementResolver.prototype, "helloBowl", null);
__decorate([
    type_graphql_1.Mutation(() => default_response_1.DefaultResponse),
    type_graphql_1.UseMiddleware(auth_mw_1.isUserAuth),
    __param(0, type_graphql_1.Arg('data', () => bowl_input_1.CreateBowlElementInput)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bowl_input_1.CreateBowlElementInput, Object]),
    __metadata("design:returntype", Promise)
], BowlElementResolver.prototype, "createBowlElement", null);
BowlElementResolver = __decorate([
    type_graphql_1.Resolver()
], BowlElementResolver);
exports.BowlElementResolver = BowlElementResolver;
//# sourceMappingURL=bowlElement.resolver.js.map