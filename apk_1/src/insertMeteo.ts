import { AppDataSource } from "./data-source";
import { MeteoJour } from "./entity/meteoJour";

const data = [
  {
    date: "2025-05-09",
    temp_min: 12.5,
    temp_max: 20.1,
    description: "partiellement nuageux",
    humidity: 65,
    wind_speed: 4.2,
    pop: 0.1,
  },
  {
    date: "2025-05-10",
    temp_min: 13.0,
    temp_max: 22.3,
    description: "ensoleillé",
    humidity: 58,
    wind_speed: 3.5,
    pop: 0.0,
  },
  {
    date: "2025-05-11",
    temp_min: 11.8,
    temp_max: 18.9,
    description: "pluie légère",
    humidity: 72,
    wind_speed: 5.1,
    pop: 0.4,
  },
  {
    date: "2025-05-12",
    temp_min: 10.6,
    temp_max: 17.2,
    description: "nuageux",
    humidity: 70,
    wind_speed: 4.8,
    pop: 0.2,
  },
  {
    date: "2025-05-13",
    temp_min: 12.1,
    temp_max: 19.5,
    description: "ciel dégagé",
    humidity: 60,
    wind_speed: 3.9,
    pop: 0.0,
  },
  {
    date: "2025-05-14",
    temp_min: 13.7,
    temp_max: 21.6,
    description: "averses de pluie",
    humidity: 75,
    wind_speed: 5.6,
    pop: 0.6,
  },
  {
    date: "2025-05-15",
    temp_min: 14.0,
    temp_max: 23.2,
    description: "ensoleillé",
    humidity: 55,
    wind_speed: 3.1,
    pop: 0.0,
  }
];

AppDataSource.initialize()
  .then(async () => {
    const repo = AppDataSource.getRepository(MeteoJour);
    await repo.save(data);
    console.log("✅ Données météo insérées !");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erreur d'insertion :", error);
    process.exit(1);
  });
