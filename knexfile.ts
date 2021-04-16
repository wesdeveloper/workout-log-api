export default {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.db',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations',
    },
  },
};
