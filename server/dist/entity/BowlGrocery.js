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
exports.BowlGrocery = void 0;
const typeorm_1 = require("typeorm");
const BowlGroceryCategory_1 = require("./BowlGroceryCategory");
let BowlGrocery = class BowlGrocery extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BowlGrocery.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BowlGrocery.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BowlGrocery.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BowlGrocery.prototype, "cals", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BowlGroceryCategory_1.BowlGroceryCategory, category => category.bowlgroceries),
    __metadata("design:type", BowlGroceryCategory_1.BowlGroceryCategory)
], BowlGrocery.prototype, "category", void 0);
BowlGrocery = __decorate([
    typeorm_1.Entity()
], BowlGrocery);
exports.BowlGrocery = BowlGrocery;
//# sourceMappingURL=BowlGrocery.js.map