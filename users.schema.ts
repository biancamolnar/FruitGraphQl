import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class Fruit {
    @Field()
    id!: number

    @Field()
    name!: string

    @Field()
    color!: string
}

@InputType()
export class FruitInput {
    @Field()
    name!: string

    @Field()
    color!: string
}