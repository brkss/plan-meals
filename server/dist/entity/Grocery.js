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
exports.Grocery = void 0;
const typeorm_1 = require("typeorm");
const GroceryCategory_1 = require("./GroceryCategory");
const Ingredient_1 = require("./Ingredient");
const User_1 = require("./User");
let Grocery = class Grocery extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grocery.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Grocery.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], Grocery.prototype, "available", void 0);
__decorate([
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], Grocery.prototype, "price", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => User_1.User, user => user.groceries, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], Grocery.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => GroceryCategory_1.GroceryCategory, category => category.groceries, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", GroceryCategory_1.GroceryCategory)
], Grocery.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Ingredient_1.Ingredient, ingredient => ingredient.recipe, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Grocery.prototype, "ingredients", void 0);
Grocery = __decorate([
    typeorm_1.Entity('groceries')
], Grocery);
exports.Grocery = Grocery;
//# sourceMappingURL=Grocery.js.map