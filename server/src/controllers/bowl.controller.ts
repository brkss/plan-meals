import  { Router, Request, Response} from 'express';


export class BowlController {

    public router: Router;

    constructor(){
        this.router = Router();
        this.routing();
    }

    public index(req: Request, res: Response){
        req.body;
        res.send('hello world from bowl ');
    }
    

    public routing() {

        this.router.get('/', (req, res) => this.index(req, res));

    }
}