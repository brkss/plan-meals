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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("../../resolvers/user/user.resolver");
const bowlElement_resolver_1 = require("../../resolvers/bowl/bowlElement.resolver");
const bowlElementCategory_resolver_1 = require("../../resolvers/bowl/bowlElementCategory.resolver");
const createSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield type_graphql_1.buildSchema({
        resolvers: [user_resolver_1.UserResolver, bowlElement_resolver_1.BowlElementResolver, bowlElementCategory_resolver_1.BowlElementCategoryResolver],
        validate: true
    });
});
exports.createSchema = createSchema;
//# sourceMappingURL=createSchema.js.map