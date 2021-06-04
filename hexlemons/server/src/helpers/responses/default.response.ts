import { Field, ObjectType } from "type-graphql";


@ObjectType()
export class DefaultResponse {

    @Field(() => Boolean)
    status: boolean;

    @Field(() => String)
    message: string;

    @Field(() => [Error], {nullable: true})
    errors?: Error[];
} 

@ObjectType()
export class Error {

    @Field(() => String, {nullable: true})
    field?: string;

    @Field(() => String, {nullable: true})
    message?:string;
}