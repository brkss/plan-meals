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
exports.Ingredient = void 0;
const typeorm_1 = require("typeorm");
const Grocery_1 = require("./Grocery");
const Recipe_1 = require("./Recipe");
let Ingredient = class Ingredient extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ingredient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ingredient.prototype, "measurement", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Ingredient.prototype, "calories", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Recipe_1.Recipe, recipe => recipe.ingredients, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Recipe_1.Recipe)
], Ingredient.prototype, "recipe", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Grocery_1.Grocery, grocery => grocery.ingredients, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    __metadata("design:type", Grocery_1.Grocery)
], Ingredient.prototype, "grocery", void 0);
Ingredient = __decorate([
    typeorm_1.Entity('ingredients')
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=Ingredient.js.map