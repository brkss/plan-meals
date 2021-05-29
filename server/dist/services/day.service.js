"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayService = void 0;
const httpContext = __importStar(require("express-http-context"));
const User_1 = require("../entity/User");
const Day_1 = require("../entity/Day");
const Meal_1 = require("../entity/Meal");
const Recipe_1 = require("../entity/Recipe");
class DayService {
    checkDay(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.date || !input.title) {
                return {
                    status: false,
                    message: 'Invalid data!'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found'
                };
            }
            const day = yield Day_1.Day.findOne({ where: { date: input.date.toUpperCase() } });
            if (day) {
                const meals = yield Meal_1.Meal.find({ where: { day: day }, order: { id: 'ASC' }, relations: ['recipes'] });
                return {
                    status: true,
                    message: 'Day already exist!',
                    id: day.id,
                    meals: meals
                };
            }
            else {
                return {
                    status: true,
                    message: 'Day have no recipes',
                    id: null,
                    meals: [],
                    default_meals: [
                        {
                            title: 'Breakfast'
                        },
                        {
                            title: 'Lunch'
                        },
                        {
                            title: 'Dinner'
                        }
                    ]
                };
            }
        });
    }
    createDay(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.date || !input.title) {
                return {
                    status: false,
                    message: 'Invalid data!'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found'
                };
            }
            if (yield this.cleanupEmptyDays()) {
                console.log('days deleted successfuly');
            }
            const day = yield Day_1.Day.findOne({ where: { date: input.date.toUpperCase() } });
            if (day) {
                const meals = yield Meal_1.Meal.find({ where: { day: day }, order: { id: 'ASC' }, relations: ['recipes'] });
                return {
                    status: true,
                    message: 'Day already exist!',
                    id: day.id,
                    meals: meals
                };
            }
            try {
                const day_resp = yield Day_1.Day.insert({
                    title: input.title,
                    date: input.date,
                    user: user
                });
                const day = yield Day_1.Day.findOne({ where: { id: day_resp.identifiers[0].id } });
                yield this.CreateMeal({ title: 'Breakfast', day_id: day.id });
                yield this.CreateMeal({ title: 'Lunch', day_id: day.id });
                yield this.CreateMeal({ title: 'Dinner', day_id: day.id });
                const meals = yield Meal_1.Meal.find({ where: { day: day }, order: { id: 'ASC' } });
                return {
                    status: true,
                    message: 'day created successfuly',
                    id: day_resp.identifiers[0].id,
                    meals: meals
                };
            }
            catch (e) {
                console.log('create date error => ', e);
                return {
                    status: false,
                    message: 'Something went wrong'
                };
            }
        });
    }
    CreateMeal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.day_id || !input.title) {
                return {
                    status: false,
                    message: 'Invalid Data!'
                };
            }
            const day = yield Day_1.Day.findOne({ where: { id: input.day_id } });
            if (!day) {
                return {
                    status: false,
                    message: 'Day not found!'
                };
            }
            try {
                const meal = yield Meal_1.Meal.insert({
                    day: day,
                    title: input.title
                });
                return {
                    status: true,
                    message: 'Meal created successfuly',
                    id: meal.identifiers[0].id
                };
            }
            catch (e) {
                console.log('creating day response => ', e);
                return {
                    status: false,
                    message: 'Something went wrong while creating new meal!'
                };
            }
        });
    }
    addRecipetoMeal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.meal_id || !input.recipe_id) {
                return {
                    status: false,
                    message: 'Invalid data!'
                };
            }
            if (!(yield this.checkIfMealBelongToUser(input.meal_id))) {
                return {
                    status: false,
                    message: 'Something is wrong with your meal'
                };
            }
            const meal = yield Meal_1.Meal.findOne({ where: { id: input.meal_id } });
            const recipe = yield Recipe_1.Recipe.findOne({ where: { id: input.recipe_id }, relations: ['meals'] });
            if (!recipe || !meal) {
                return {
                    status: false,
                    message: 'Invalid recipe or meal data!'
                };
            }
            if (recipe.meals.findIndex(x => x.id === meal.id) !== -1) {
                return {
                    status: false,
                    message: 'You already added this recipe to your meal :D'
                };
            }
            recipe.meals = [...recipe.meals, meal];
            yield recipe.save();
            return {
                status: true,
                message: 'recipe added to meal successfuly !'
            };
        });
    }
    deleteMeal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return {
                    status: false,
                    message: 'Invalid Meal ID!'
                };
            if (!(yield this.checkIfMealBelongToUser(id))) {
                return {
                    status: false,
                    message: 'Something is wrong with your meal'
                };
            }
            try {
                yield Meal_1.Meal.delete({ id: id });
            }
            catch (e) {
                console.log('error deleting ');
            }
            return {
                status: true,
                message: 'Meal deleted successfuly'
            };
        });
    }
    deleteRecipeFromMeal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.meal_id || !input.recipe_id) {
                return {
                    status: false,
                    message: 'Invalid data!'
                };
            }
            if (!(yield this.checkIfMealBelongToUser(input.meal_id))) {
                return {
                    status: false,
                    message: 'Something is wrong with your meal'
                };
            }
            const recipe = yield Recipe_1.Recipe.findOne({ where: { id: input.recipe_id } });
            const meal = yield Meal_1.Meal.findOne({ where: { id: input.meal_id }, relations: ['recipes'] });
            if (!meal || !recipe) {
                return {
                    status: false,
                    message: 'Data not found!'
                };
            }
            try {
                const recipeIndex = meal.recipes.findIndex(x => x.id === recipe.id);
                if (recipeIndex === -1) {
                    return {
                        status: false,
                        message: 'Recipe not found'
                    };
                }
                meal.recipes.splice(recipeIndex, 1);
                yield meal.save();
                return {
                    status: true,
                    message: 'Recipe removed successfuly from your meal'
                };
            }
            catch (e) {
                console.log('deleting recipe from meals => ', e);
                return {
                    status: false,
                    message: 'Something went wrong deleting this recipe from your meal'
                };
            }
            return {
                status: true,
                message: ''
            };
        });
    }
    checkIfMealBelongToUser(meal_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield Meal_1.Meal.findOne({ where: { id: meal_id }, relations: ['day', 'day.user'] });
            if (!meal) {
                return false;
            }
            if (meal.day.user.id !== httpContext.get('userId')) {
                return false;
            }
            return true;
        });
    }
    cleanupEmptyDays() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return false;
            }
            const days = yield Day_1.Day.find({ where: { user: user } });
            if (days.length === 0) {
                return true;
            }
            for (let j = 0; j < days.length; j++) {
                const day_meals = yield Meal_1.Meal.find({ where: { day: days[j] }, relations: ['recipes'] });
                for (let i = 0; i < day_meals.length; i++) {
                    if (day_meals[i].recipes.length > 0) {
                        return false;
                    }
                }
                yield Day_1.Day.delete(days[j]);
            }
            return true;
        });
    }
}
exports.DayService = DayService;
//# sourceMappingURL=day.service.js.map