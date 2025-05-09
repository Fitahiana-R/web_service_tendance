import { DataSource } from "typeorm";
import {MeteoJour } from "./entity/meteoJour";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "meteo_db",
  synchronize: true, // à mettre à false en prod
  entities: [MeteoJour],
});
