import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Utils from "../utils/utils";

class ConfigService {

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: Utils.getValue('POSTGRES_HOST'),
      port: parseInt(Utils.getValue('POSTGRES_PORT')!),
      username: Utils.getValue('POSTGRES_USER'),
      password: Utils.getValue('POSTGRES_PASSWORD'),
      database: Utils.getValue('POSTGRES_DATABASE'),
      entities: ['dist/db/entities/*.entity.{ts,js}'],
      migrationsTableName: 'migration',
      migrations: ['dist/db/migration/*.js'],
      ssl: false,
      autoLoadEntities: true,
    };
  }

}

const configService = new ConfigService();

export { configService };