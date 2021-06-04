import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterUserInput {

    @Field(() => String)
    name: string;
    
    @Field(() => String)
    email: string;
    
    @Field(() => String)
    username: string;
    
    @Field(() => String)
    password: string;

}

@InputType()
export class LoginUserInput {

    @Field(() => String)
    identifier: string;

    @Field(() => String)
    password: string;

}