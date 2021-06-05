
export interface IRoute {

    name: string;
    path: string;
    component: any;
    exact: boolean;
    protected: boolean;
    children?: IRoute[];
    routes?: IRoute[];
    props?: any;

}