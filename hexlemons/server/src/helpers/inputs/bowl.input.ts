import { GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';
import { IUpload } from '../types/Upload';


@InputType()
export class CreateBowlElementInput {

    /* @Field(() => String)
    title: string;

    @Field(() => String)
    calories: string; */

    @Field(() => GraphQLUpload)
    image: IUpload

}

