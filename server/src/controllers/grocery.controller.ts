import { Request, Response , Router } from 'express';
import { IGrocery } from '../helpers/types/IGrocery';
import { GroceryService } from '../services/grocery.service';

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

    public routing(){

        this.router.post('/create', (req, res) => this.create(req, res));
        this.router.post('/categories', (_, res) => this.categories(res));

    }
}