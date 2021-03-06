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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Bowl_1 = require("./Bowl");
const BowlGrocery_1 = require("./BowlGrocery");
const Day_1 = require("./Day");
const Grocery_1 = require("./Grocery");
const Recipe_1 = require("./Recipe");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('int', { default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Recipe_1.Recipe, recipe => recipe.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "recipes", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Grocery_1.Grocery, grocery => grocery.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "groceries", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Day_1.Day, day => day.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "days", void 0);
__decorate([
    typeorm_1.OneToMany(_ => Bowl_1.Bowl, bowl => bowl.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "bowls", void 0);
__decorate([
    typeorm_1.OneToMany(_ => BowlGrocery_1.BowlGrocery, bowlgrocery => bowlgrocery.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "bowlgrocery", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=User.js.map