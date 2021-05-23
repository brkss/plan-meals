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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIngredients = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const recipes_parser_1 = __importDefault(require("recipes-parser"));
const units_json_1 = __importDefault(require("recipes-parser/lib/nlp/en/en/units.json"));
const global_unit_json_1 = __importDefault(require("recipes-parser/lib/nlp/en/en/global_unit.json"));
const ParseIngredients = (ingredient) => {
    const ing = JSON.parse(`[{"id":258,"measurement":"none","name":"3 pounds potatoes, washed and cut into 2-inch chunks","calories":0,"grocery":null},{"id":259,"measurement":"none","name":"1/3 cup toasted sliced almonds","calories":0,"grocery":null},{"id":260,"measurement":"none","name":"3 medium garlic cloves minced","calories":0,"grocery":null},{"id":261,"measurement":"none","name":"8 tablespoons unsalted butter","calories":0,"grocery":null},{"id":262,"measurement":"none","name":"1 tablespoon toasted sesame seeds","calories":0,"grocery":null},{"id":263,"measurement":"none","name":"1 cup whole milk, gently warmed","calories":0,"grocery":null},{"id":264,"measurement":"none","name":"2 tablespoons dried oregano","calories":0,"grocery":null},{"id":265,"measurement":"none","name":"1 1/2 teaspoons sea salt, plus more to taste","calories":0,"grocery":null},{"id":266,"measurement":"none","name":"1 pinch of saffron (optional)","calories":0,"grocery":null},{"id":267,"measurement":"none","name":"1 teaspoon dried coriander","calories":0,"grocery":null}]`);
    const mapped_ing = ing.map((ing, key) => {
        return key !== ing.length - 1 ? ing.name : '';
    });
    const rules = fs_1.default.readFileSync(path.join(__dirname, `rules.pegjs`), {
        encoding: "utf8",
    });
    const parser = new recipes_parser_1.default(rules, units_json_1.default, global_unit_json_1.default);
    let results = null;
    try {
        results = parser.getIngredientsFromText([ingredient], false);
    }
    catch (_a) {
        return null;
    }
    console.log('ingredients => ', mapped_ing);
    console.log('parsed ing => ', results);
    return results[0].result;
};
exports.ParseIngredients = ParseIngredients;
//# sourceMappingURL=parseRecipes.js.map