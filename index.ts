import { buildSchema } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';


const fruits = [  
{ id: 1, name: 'Apple', color: 'Red' },  
{ id: 2, name: 'Banana', color: 'Yellow' },  
{ id: 3, name: 'Orange', color: 'Orange' },
];

const schema = buildSchema(`
  type Query {
    getFruit(id: Int!): Fruit
    getFruits: [Fruit]
  }

  type Fruit {
    id: Int!
    name: String!
    color: String!
  }

  input FruitInput {
    name: String!
    color: String!
  }

  type Mutation {
    createFruit(input: FruitInput): Fruit
    updateFruit(id: Int!, input: FruitInput): Fruit
  }
`);

type Fruit = {
  id: number;
  name: string;
  color: string;
};

type FruitInput = Pick<Fruit, 'name' | 'color'>;

const getFruit = (args: { id: number }): Fruit | undefined =>
  fruits.find((fruit) => fruit.id === args.id);

const getFruits = (): Fruit[] => fruits;

const createFruit = (args: { input: FruitInput }): Fruit => {
  const fruit = {
    id: fruits.length + 1,
    ...args.input,
  };
  fruits.push(fruit);
  return fruit;
};

const updateFruit = (args: { id: number; input: FruitInput }): Fruit => {
  const index = fruits.findIndex((fruit) => fruit.id === args.id);
  const targetFruit = fruits[index];

  if (targetFruit) fruits[index] = { ...targetFruit, ...args.input };

  return targetFruit;
};

const root = {
  getFruit,
  getFruits,
  createFruit,
  updateFruit,
};

const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

const PORT = 3001;

app.listen(PORT)
console.log(`Fruit server at http://localhost:${PORT}/graphql`);