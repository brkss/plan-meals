import {  Response, Router} from 'express';


export class RecipeController {
    public router : Router 

    constructor(){
        this.router = Router();
        this.routing();
    }

    index(res: Response){
        res.send({message: 'recipe working'});
    }

    public routing(){
        this.router.get('/', (_, res) => this.index(res))
    }
}