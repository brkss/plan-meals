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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBowlElementInput = void 0;
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
let CreateBowlElementInput = class CreateBowlElementInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBowlElementInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBowlElementInput.prototype, "calories", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateBowlElementInput.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_upload_1.GraphQLUpload),
    __metadata("design:type", Object)
], CreateBowlElementInput.prototype, "image", void 0);
CreateBowlElementInput = __decorate([
    type_graphql_1.InputType()
], CreateBowlElementInput);
exports.CreateBowlElementInput = CreateBowlElementInput;
//# sourceMappingURL=bowl.input.js.map