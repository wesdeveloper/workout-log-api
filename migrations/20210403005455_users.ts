import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('users', (table: Knex.TableBuilder) => {
    table.integer('id').primary();
    table.string('name').notNullable();
    table.string('lastName').notNullable();
    table.string('nickname').notNullable();
    table.integer('age');
    table.enu('gender', ['M', 'F']);
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
