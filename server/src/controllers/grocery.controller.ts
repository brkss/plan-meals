import { Request, Response , Router } from 'express';
import { IGrocery } from '../helpers/types/IGrocery';
import { GroceryService } from '../services/grocery.service';
import { isAuth } from '../helpers/middlewares/auth.middleware';


export class GroceryController {

    public router : Router 
    private service : GroceryService;

    constructor(){
        this.router = Router()
        this.service = new GroceryService();
        this.routing();
    }

    public async create(req: Request, res: Response){
        const grocery = req.body as IGrocery;
        const resp = await this.service.create(grocery);
        return res.send(resp).json();
    }

    public async categories(res: Response){
        const categories = await this.service.groceryCategories();
        return res.send(categories).json();
    }

    public async groceries(res: Response){
        const list = await this.service.listGroceries();
        res.send(list).json();
    }

    public async NextDaysGrocery(res: Response){
        const grocery = await this.service.NextDaysGrocery();
        res.send(grocery).json();
    }

    public routing(){

        this.router.post('/create', (req, res, next) => isAuth(req, res, next),(req, res) => this.create(req, res));
        this.router.post('/categories',  (req, res, next) => isAuth(req, res, next),(_, res) => this.categories(res)); 
        this.router.post('/list',  (req, res, next) => isAuth(req, res, next),(_, res) => this.groceries(res)); 
        this.router.post('/shop-list', (_, res) => this.NextDaysGrocery(res));

    }
}