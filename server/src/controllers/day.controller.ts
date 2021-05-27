import { Router, Response, Request} from 'express';
import { isAuth } from '../helpers/middlewares/auth.middleware';
import { DayService } from '../services/day.service';

export class DayController {

    public router: Router;
    private service : DayService;

    constructor(){
        this.router = Router();
        this.service = new DayService();
        this.routing();
    }

    async create(req: Request, res: Response){
        const day = req.body;
        const resp = await this.service.createDay(day); 
        res.send(resp).json();
    }

    async addRecipeToMeal(req: Request, res: Response){
        const input = req.body;
        const resp = await this.service.addRecipetoMeal(input);
        res.send(resp).json();
    }

    async deleteMeal(req: Request, res: Response){
        const id = req.body.id;
        const resp = await this.service.deleteMeal(id);
        res.send(resp).json();
    }

    async createMeal(req: Request, res: Response){
        const input = req.body;
        const resp = await this.service.CreateMeal(input);
        res.send(resp).json();
    }

    async deleteRecipeFromMeal(req: Request, res: Response){
        const input = req.body;
        const resp = await this.service.deleteRecipeFromMeal(input);
        res.send(resp).json();
    }

//deleteRecipeFromMeal
    public routing(){
        this.router.post('/create',(req, res, next) => isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/add-recipe-to-meal', (req, res, next) => isAuth(req, res, next), (req, res) => this.addRecipeToMeal(req, res))
        this.router.post('/delete-recipe-from-meal', (req, res, next) => isAuth(req, res, next), (req, res) => this.deleteRecipeFromMeal(req, res))
        this.router.post('/add-meal', (req, res, next) => isAuth(req, res, next), (req, res) => this.createMeal(req, res))
        this.router.post('/delete-meal', (req, res, next) => isAuth(req, res, next), (req, res) => this.deleteMeal(req, res))
    }


}