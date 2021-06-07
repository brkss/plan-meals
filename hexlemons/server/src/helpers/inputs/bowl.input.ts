//import { GraphQLUpload } from 'apollo-server-express';
import { GraphQLUpload, } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';
import { IUpload } from '../types/Upload';
//import { IUpload } from '../types/Upload';


@InputType()
export class CreateBowlElementInput {

    @Field(() => String)
    title: string;

    @Field(() => String)
    calories: string; 

    @Field(() => String)
    category: string;

    @Field(() => GraphQLUpload)
    image: IUpload

}

