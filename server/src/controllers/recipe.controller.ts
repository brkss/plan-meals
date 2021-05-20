import {  Request, Response, Router} from 'express';
import { RecipeService } from '../services/recipe.service';
import { isAuth } from '../helpers/middlewares/auth.middleware';
//import { CreateRecipeInput } from 'src/helpers/inputs/recipe.intup';


export class RecipeController {
    
    public router : Router 
    private service : RecipeService

    constructor(){
        this.router = Router();
        this.service = new RecipeService();
        this.routing();
    }

    index(res: Response){
        res.send({message: 'recipe working'});
    }

    public async create(req: Request, res: Response){
        let recipe = req.body;
        console.log('recipe => ', recipe);
        /* recipe.urls = JSON.parse(recipe.urls);
        recipe.directions = JSON.parse(recipe.directions);
        recipe.ingredients = JSON.parse(recipe.ingredients); */

        const resp = await this.service.createRecipe(recipe);
        //console.log('request body => ', req.body);
        //console.log('ing calories => ', recipe.ingredients[0].calories);
        
        return res.send(resp).json();
    }

    public routing(){
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/create',  (req, res, next) => isAuth(req, res, next), (req, res) => this.create(req, res));
    }
}