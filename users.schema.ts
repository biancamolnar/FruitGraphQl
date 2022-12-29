import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class Fruit {
    @Field()
    id!: number

    @Field()
    name!: string

    @Field()
    color!: string

    @Field()
    price!: number

    @Field()
    origin!: string
}

@InputType()
export class FruitInput {
    @Field()
    name!: string

    @Field()
    color!: string

    @Field()
    price!: number

    @Field()
    origin!: string
}