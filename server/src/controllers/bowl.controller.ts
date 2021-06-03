import  { Router, Request, Response} from 'express';
import { BowlService } from '../services/bowl.service';
import { isAuth } from '../helpers/middlewares/auth.middleware';

export class BowlController {

    public router: Router;
    public service: BowlService;

    constructor(){
        this.router = Router();
        this.service = new BowlService();
        this.routing();
    }

    public index(req: Request, res: Response){
        req.body;
        res.send('hello world from bowl ');
    }
    
    // create bowl groicery 
    public async createBowlGrocery(req: Request, res: Response) {
        const input = req.body;
        const resp = await this.service.createBowlGrocery(input);
        res.send(resp).json();
    }

    public routing() {

        this.router.post('/create', (req, res, next) => isAuth(req, res, next), (req, res) => this.createBowlGrocery(req, res));

    }
}