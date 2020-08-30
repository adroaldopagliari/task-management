import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const host = process.env.RDS_HOSTNAME || config.get<string>('db.host');
const port = Number(process.env.RDS_PORT) || config.get<number>('db.port');
const username = process.env.RDS_USERNAME || config.get<string>('db.username');
const password = process.env.RDS_PASSWORD || config.get<string>('db.password');
const database = process.env.RDS_DB_NAME || config.get<string>('db.database');
const synchronize =
  Boolean(process.env.TYPEORM_SYNC) || config.get<boolean>('db.synchronize');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize,
};

export default typeOrmConfig;
