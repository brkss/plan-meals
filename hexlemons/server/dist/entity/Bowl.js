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
exports.Bowl = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BowlElement_1 = require("./BowlElement");
const User_1 = require("./User");
let Bowl = class Bowl extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Bowl.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Bowl.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Bowl.prototype, "ticket", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.bowls, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], Bowl.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [BowlElement_1.BowlElement]),
    typeorm_1.ManyToMany(() => BowlElement_1.BowlElement),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Bowl.prototype, "elements", void 0);
Bowl = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('bowls')
], Bowl);
exports.Bowl = Bowl;
//# sourceMappingURL=Bowl.js.map