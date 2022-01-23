module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'chainstarters-db',
    synchronize: true,
    migrationsRun: true,
    dropSchema: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
    migrations: ['dist/migration/**/*.{ts,js}'],
    seeds: ['dist/**/*.seed{.ts,.js}'],
    factories: ['dist/**/*.factory{.ts,.js}'],
    cli: {
        migrationsDir: "migration"
    },
}
