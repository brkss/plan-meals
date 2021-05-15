import { Router,  Response, Request } from 'express';
import { LoginInput } from '../helpers/inputs/login.input';
import { isAuth } from '../helpers/middlewares/auth.middleware';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';


export class UserController {


    public router : Router;
    public service : UserService;

    constructor(){
        this.service = new UserService();
        this.router = Router();
        this.routes();
    }

    public index(res: Response){
        return res.send('user index'); 
    }

    // login 
    public async login(req: Request, res: Response){
        const input = req['body'] as LoginInput;
        const resp = await this.service.login(input, res);
        console.log('req -> ', req['body']);
        return res.send(resp).json();
    }

    // register 
    public async register(req: Request, res: Response){
        const user = req['body'] as User;
        const resp = await this.service.register(user, res); 
        console.log('req -> ', req['body']);
        console.log('register response => ', resp);
        return res.send(resp).json();
    }

    // me 
    public async me(res: Response){
        const me = await this.service.me();
        res.send(me).json()
    }

    // refresh token 
    public async refreshToken(req: Request, res: Response){
        const token = req.cookies.jid;
        const resp = await this.service.refreshToken(token, res);
        return res.send(resp).json();
    }

    // revoke token 
    public async revokeToken(req: Request, res: Response){
        const id = req.params.id;
        const resp = await this.service.revokeToken(id);
        res.send(resp).json();
    }


    public routes() : void{
        this.router.get('/',  (_, res) => this.index(res) )
        this.router.post('/login', (req, res) => this.login(req, res));
        this.router.post('/register', (req, res) => this.register(req, res));
        this.router.post('/me',(req, res, next) => isAuth(req, res, next) ,(_, res) => this.me(res));
        this.router.post('/refresh_token', (req, res) => this.refreshToken(req, res));
        this.router.post('/revoke_token/:id', (req, res) => this.revokeToken(req, res));
    }

    

}