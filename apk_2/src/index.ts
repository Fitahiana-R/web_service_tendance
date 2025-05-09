import { promises } from "dns";
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.post("/traitement", async (req:Request, res:Response):Promise<any> => {
  console.log("on a recu ca du apk_1", req.body.meteo);

  //contenu de la requette
  const meteoJours = req.body.meteo;

  //message d'erreur 
  if (!Array.isArray(meteoJours)) {
    return res.status(400).json({ message: "Données invalides" });
  }

  // Calcul de la moyenne globale

  const moyennes = meteoJours.map(j => (j.temp_min + j.temp_max) / 2);
  const moyenneGlobale = moyennes.reduce((a, b) => a + b, 0) / moyennes.length;
  const jourMin = meteoJours.reduce((a, b) =>
    a.temp_min < b.temp_min ? a : b
  );
  const jourMax = meteoJours.reduce((a, b) =>
    a.temp_max > b.temp_max ? a : b
  );

  

   // reponse envoyée a apk 1
    res.json({
      moyenneGlobale: moyenneGlobale.toFixed(1),
      jourLePlusFroid: jourMin,
      jourLePlusChaud: jourMax,
    });
  }
  );

//lancer sur le port 4001
app.listen(4001, () => {
  console.log("lancement port 4001 apk 2");
});
