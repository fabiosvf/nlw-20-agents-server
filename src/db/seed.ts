import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

const seederSchema = {
  rooms: schema.rooms,
  questions: schema.questions,
};

await reset(db, schema);

await seed(db, seederSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columnns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
    audioChunks: {
      count: 0,
    },
  };
});

await sql.end();

console.log('Database seeded');
