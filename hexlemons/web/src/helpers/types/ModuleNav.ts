export interface IModuleNav {
    [name: string] : ISingleNavItem[]
}

export interface ISingleNavItem {
    id: string,
    name: string,
    path: string
}