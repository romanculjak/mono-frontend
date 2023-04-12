export interface Make {
    id: string,
    name: string,
    country: string
}

export interface Model {
    id:string,
    name: string,
    make: string,
    //year: number,
    //price: number,
}