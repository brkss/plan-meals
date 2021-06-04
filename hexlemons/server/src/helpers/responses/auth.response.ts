import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthResponse {

    @Field(() => Boolean) 
    status: boolean;

    @Field(() => String, {nullable: true})
    message?: string;

    @Field(() => String, {nullable: true})
    accessToken?: string;

}