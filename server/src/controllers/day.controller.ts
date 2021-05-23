import { Router, Response} from 'express';
import { DayService } from '../services/day.service';

export class DayController {

    public router: Router;
    private service : DayService;

    constructor(){
        this.router = Router();
        this.service = new DayService();
        this.routing();
    }

    async create(res: Response){
        res.send(await this.service.createDay());
    }

    public routing(){
        this.router.get('/', (_, res) => this.create(res));
    }


}