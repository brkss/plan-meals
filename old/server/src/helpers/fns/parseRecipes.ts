import fs from "fs";
import * as path from "path";
import RecipesParser from "recipes-parser";
import units from "recipes-parser/lib/nlp/en/en/units.json";
import globalUnit from "recipes-parser/lib/nlp/en/en/global_unit.json";

export const ParseIngredients = (ingredient: string) => {

    const ing = JSON.parse(`[{"id":258,"measurement":"none","name":"3 pounds potatoes, washed and cut into 2-inch chunks","calories":0,"grocery":null},{"id":259,"measurement":"none","name":"1/3 cup toasted sliced almonds","calories":0,"grocery":null},{"id":260,"measurement":"none","name":"3 medium garlic cloves minced","calories":0,"grocery":null},{"id":261,"measurement":"none","name":"8 tablespoons unsalted butter","calories":0,"grocery":null},{"id":262,"measurement":"none","name":"1 tablespoon toasted sesame seeds","calories":0,"grocery":null},{"id":263,"measurement":"none","name":"1 cup whole milk, gently warmed","calories":0,"grocery":null},{"id":264,"measurement":"none","name":"2 tablespoons dried oregano","calories":0,"grocery":null},{"id":265,"measurement":"none","name":"1 1/2 teaspoons sea salt, plus more to taste","calories":0,"grocery":null},{"id":266,"measurement":"none","name":"1 pinch of saffron (optional)","calories":0,"grocery":null},{"id":267,"measurement":"none","name":"1 teaspoon dried coriander","calories":0,"grocery":null}]`)
    const mapped_ing = ing.map((ing: any, key: number) => {
        return key !== ing.length -1 ? ing.name : ''
    })

    const rules = fs.readFileSync(
        path.join(__dirname, `rules.pegjs`),{
            encoding: "utf8",
        }
    );
    
    const parser = new RecipesParser(rules, units, globalUnit);
    let results = null;
    try {
        results = parser.getIngredientsFromText(
            [ingredient], false
        );
    }catch {
        return null;
    }
    
    console.log('ingredients => ', mapped_ing);
    console.log('parsed ing => ', results);
    return results[0];
} 
