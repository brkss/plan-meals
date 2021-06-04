

export class CreateBowlGroceryInput {

    title: string;
    cals?: string;
    category_id: number;

}

export class CreateBowlInput {
    title : string;
    ticket: string;
    time: string;
    bowlGroceries: any
}