export interface IRoute {

    name: string;
    path: string;
    component: any;
    props?: any;
    exact: boolean; 
    protected: boolean;
    children?: IRoute[] 

}
