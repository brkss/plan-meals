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
exports.BowlElement = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Bowl_1 = require("./Bowl");
const BowlElementCategories_1 = require("./BowlElementCategories");
const User_1 = require("./User");
let BowlElement = class BowlElement extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BowlElement.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BowlElement.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BowlElement.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BowlElement.prototype, "calories", void 0);
__decorate([
    type_graphql_1.Field(() => BowlElementCategories_1.BowlElementCategory),
    typeorm_1.ManyToOne(() => BowlElementCategories_1.BowlElementCategory, category => category.elements, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", BowlElementCategories_1.BowlElementCategory)
], BowlElement.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.bowlElements, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], BowlElement.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => Bowl_1.Bowl),
    typeorm_1.ManyToMany(() => Bowl_1.Bowl),
    __metadata("design:type", Array)
], BowlElement.prototype, "bowls", void 0);
BowlElement = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('bowl_elements')
], BowlElement);
exports.BowlElement = BowlElement;
//# sourceMappingURL=BowlElement.js.map