import { DataSource } from "typeorm";
import Utils from "../utils/utils";


const AppDataSource = new DataSource({
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
  });

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    })

export default AppDataSource;