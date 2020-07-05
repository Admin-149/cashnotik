import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/server/**/*.graphql'],
  path: join(process.cwd(), './src/server/graphql.ts'),
  watch: true,
  emitTypenameField: true,
});
