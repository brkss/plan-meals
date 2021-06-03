import  { Router, Request, Response} from 'express';
import { BowlService } from '../services/bowl.service';
import { isAuth } from '../helpers/middlewares/auth.middleware';
import multer, { Multer, StorageEngine } from 'multer';
import path from 'path';

export class BowlController {

    public router: Router;
    public service: BowlService;
    private upload : Multer;
    private storage : StorageEngine;
    constructor(){
        this.router = Router();
        this.service = new BowlService();
        this.storage = multer.diskStorage({
            destination: function (_, __, cb) {
                cb(null, 'uploads/')
            },
            filename: function (_, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
            }
        })
        this.upload = multer({storage: this.storage});
        this.routing();
    }

    public index(req: Request, res: Response){
        req.body;
        res.send('hello world from bowl ');
    }

    // create bowl 
    public async createBowl(req: Request, res: Response){
        const input = req.body;
        const resp = await this.service.createBowl(input);
        return res.send(resp).json();
    }
    
    // create bowl groicery 
    public async createBowlGrocery(req: Request, res: Response) {
        const input = req.body;
        const resp = await this.service.createBowlGrocery(input);
        return res.send(resp).json();
    }

    // get bowl grocery categories 
    public async getBowlGroceryCategories(res: Response){
        return res.send(await this.service.getBowlGroceriesCategory()).json();
    }

    // get bowls 
    public async getBowls(res :Response){
        return res.send(await this.service.getBowls()).json();
    }

    public routing() {
        this.router.post('/create-grocery', (req, res, next) => isAuth(req, res, next), this.upload.single('image'), (req, res) => this.createBowlGrocery(req, res));
        this.router.get('/categories', (req, res, next) => isAuth(req, res, next), (_, res) => this.getBowlGroceryCategories(res));
        this.router.post('/create', (req, res, next) => isAuth(req, res, next), (req, res) => this.createBowl(req, res));
        this.router.get('/bowls', (req, res, next) => isAuth(req, res, next), (_, res) => this.getBowls(res));
    }
}