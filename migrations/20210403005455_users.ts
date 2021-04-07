import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('lastName').notNullable();
    table.string('nickname').notNullable();
    table.integer('age');
    table.enu('gender', ['M', 'F']);
    table.double('height');
    table.double('wheight');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
