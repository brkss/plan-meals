import {  Request, Response, Router} from 'express';
import { RecipeService } from '../services/recipe.service';
import { isAuth } from '../helpers/middlewares/auth.middleware';
import { ParseIngredients } from '../helpers/fns/parseRecipes';


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

    public async createFromUrl(req: Request, res: Response){
        let url = req.body.url;
        console.log('url => ', url);
        const resp = await this.service.createRecipeByUrl(url);
        console.log('create from url response => ', resp);
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

    // parse recipe ing 
    public ParseRecipe(res: Response){
        const resp = ParseIngredients("2 kg chiken");
        res.send(resp).json();
    }

    public routing(){
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/create',  (req, res, next) => isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/create-from-url', (req, res, next) => isAuth(req, res, next), (req, res) => this.createFromUrl(req, res));
        this.router.post('/list', (req, res, next) => isAuth(req, res, next), (_, res) => this.recipes(res));
        this.router.post('/info', (req, res, next) => isAuth(req, res, next), (req, res) => this.recipeInfo(req, res));
        this.router.post('/parse', (_, res) => this.ParseRecipe(res));
    }
}