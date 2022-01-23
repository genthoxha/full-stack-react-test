export default {
  isDevMod: process.env.NODE_ENV === 'development',
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'chainstarters-db',
    dropSchema: process.env.NODE_ENV === 'test',
    entities: [`dist/**/*.entity.js`],
    synchronize: true,
  },
};
