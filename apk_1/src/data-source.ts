import { DataSource } from "typeorm";
import {MeteoJour } from "./entity/meteoJour";
import { getRequiredEnv } from "./utils/env";
import * as env from "dotenv";

env.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getRequiredEnv('HOST_URL') ,
  port: 5432,
  username:getRequiredEnv('USER_NAME'),
  password: getRequiredEnv('PASSWORD'),
  database: getRequiredEnv('DATA_NAME'),
  synchronize: true, // à mettre à false en prod
  entities: [MeteoJour],
});
