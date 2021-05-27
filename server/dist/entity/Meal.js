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
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const Day_1 = require("./Day");
const Recipe_1 = require("./Recipe");
let Meal = class Meal extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Meal.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Meal.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Meal.prototype, "finish", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "time", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => Day_1.Day, day => day.meals, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Day_1.Day)
], Meal.prototype, "day", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Recipe_1.Recipe, recipe => recipe.meals),
    __metadata("design:type", Array)
], Meal.prototype, "recipes", void 0);
Meal = __decorate([
    typeorm_1.Entity('meals')
], Meal);
exports.Meal = Meal;
//# sourceMappingURL=Meal.js.map