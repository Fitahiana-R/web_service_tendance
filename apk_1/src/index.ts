import express, { Request, Response } from "express";
import axios from "axios";
import { env } from "process";
import { AppDataSource } from "./data-source";
import { MeteoJour } from "./entity/meteoJour";

const API_KEY = '67fd06e75fd9acc282cd66549993fd81';
const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {

//recuperation data  dans openweather
  const meteoResponse= await axios.get(
   `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}&units=metric`
  );

 //console.log(response.data.main);
  //extraction des données
  const { temp_min, temp_max, humidity } = meteoResponse.data.main;
  const description = meteoResponse.data.weather[0].description;
  const wind_speed = meteoResponse.data.wind.speed;
  const pop = meteoResponse.data.pop || 0;
  const date = new Date().toISOString().split("T")[0];

  
//connexion a la base de donnée
AppDataSource.initialize()
  .then(async () => {
    const repo = AppDataSource.getRepository(MeteoJour);
// Insertion des données
const meteo = new MeteoJour();
meteo.date = date;
meteo.temp_min = temp_min;
meteo.temp_max = temp_max;
meteo.description = description;
meteo.humidity = humidity;
meteo.wind_speed = wind_speed;
meteo.pop = pop;

await repo.save(meteo);
console.log("✅ Données météo insérées !");

    const jours = await repo.find({ order: { date: "ASC" } });

    // Envoi vers apk_2
    const response = await axios.post("http://localhost:4001/traitement", {
      meteo: jours, // on met tous les jours dans un champ "meteo"
    });

    console.log("✅ Données envoyées à apk_2 :", response.data);

    const { moyenneGlobale, jourLePlusFroid, jourLePlusChaud } = response.data;

console.log("📊 Moyenne globale sur 7 jours :", moyenneGlobale, "°C");
console.log("📉 Jour le plus froid :", jourLePlusFroid.date, "-", jourLePlusFroid.temp_min, "°C");
console.log("📈 Jour le plus chaud :", jourLePlusChaud.date, "-", jourLePlusChaud.temp_max, "°C");



})
  .catch(console.error);

  

});


app.listen(4000, () => {
  console.log("lancement port 4000");
});
