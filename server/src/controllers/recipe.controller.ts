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
        const resp = await this.service.createRecipe(recipe);
        return res.send(resp).json();
    }

    public async recipes(res: Response){
        const resp = await this.service.recipes();
        res.send(resp).json();
    }

    public async recipeInfo(req: Request, res: Response){
        const id = req.body.recipe_id;
        const resp = await this.service.recipeInfo(id);
        res.send(resp).json();
    }

    public routing(){
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/create',  (req, res, next) => isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/list', (req, res, next) => isAuth(req, res, next), (_, res) => this.recipes(res));
        this.router.post('/info', (req, res, next) => isAuth(req, res, next), (req, res) => this.recipeInfo(req, res));
    }
}