import { Router, Response, Request} from 'express';
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

    public routing(){
        this.router.post('/create', (req, res) => this.create(req, res));
    }


}