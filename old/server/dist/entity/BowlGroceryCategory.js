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
exports.BowlGroceryCategory = void 0;
const typeorm_1 = require("typeorm");
const BowlGrocery_1 = require("./BowlGrocery");
let BowlGroceryCategory = class BowlGroceryCategory extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BowlGroceryCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BowlGroceryCategory.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BowlGroceryCategory.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => BowlGrocery_1.BowlGrocery, bowlgrocery => bowlgrocery.category),
    __metadata("design:type", Array)
], BowlGroceryCategory.prototype, "bowlgroceries", void 0);
BowlGroceryCategory = __decorate([
    typeorm_1.Entity()
], BowlGroceryCategory);
exports.BowlGroceryCategory = BowlGroceryCategory;
//# sourceMappingURL=BowlGroceryCategory.js.map