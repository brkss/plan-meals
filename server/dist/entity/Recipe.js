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
exports.Recipe = void 0;
const typeorm_1 = require("typeorm");
const Direction_1 = require("./Direction");
const Ingredient_1 = require("./Ingredient");
const Url_1 = require("./Url");
const User_1 = require("./User");
let Recipe = class Recipe extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Recipe.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], Recipe.prototype, "public", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => User_1.User, user => user.recipes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", User_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Url_1.Url, url => url.recipe, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Recipe.prototype, "urls", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Direction_1.Direction, direction => direction.recipe, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Recipe.prototype, "directions", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Ingredient_1.Ingredient, direction => direction.recipe, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
Recipe = __decorate([
    typeorm_1.Entity('recipes')
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map