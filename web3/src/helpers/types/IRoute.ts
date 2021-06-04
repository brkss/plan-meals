export interface IRoute {
    name: string;
    path: string;
    component: any;
    props?: any;
    protected: boolean;
    children?: IRoute[]; 
}