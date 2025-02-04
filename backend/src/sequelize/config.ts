import { Dialect } from 'sequelize';

import * as dotenv from 'dotenv';
dotenv.config();

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    url: string;
  };
}

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    url: process.env.DB_URL || '',
  },
  test: {
    dialect: 'postgres',
    url: process.env.DB_URL || '',
  },
  production: {
    dialect: 'postgres',
    url: process.env.DB_URL || '',
  },
};

export = config;
