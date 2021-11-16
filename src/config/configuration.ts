import 'dotenv/config';
import { join } from 'path';


const dbconfig = {
    local: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'crm',
    },
    test: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'crm',
    },
    production: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'crm',
    },
};


export default () => ({
  rootPath: join(__dirname, '..'),
  database: {
    host: dbconfig[process.env.NODE_ENV].host,
    port: dbconfig[process.env.NODE_ENV].port,
    username: dbconfig[process.env.NODE_ENV].username,
    password: dbconfig[process.env.NODE_ENV].password,
    database: dbconfig[process.env.NODE_ENV].database,
  },
});
  