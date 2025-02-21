// Importer les modules nécessaires
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser toutes les origines avec CORS
app.use(cors());

// Parse les requêtes JSON et les données d'URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur proxy!");
});

// Route du proxy
app.post("/proxy", async (req, res) => {
  try {
    const apiUrl = "https://search-fel.centprod.com/v3/search-fel";
    
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    });

    // Redirige la réponse reçue de l'API vers le client
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Erreur du Proxy:", error.message);
    res.status(500).json({ error: "Erreur lors de la requête proxy" });
  }
});

// Lancer le serveur sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur Proxy actif sur http://localhost:${PORT}`);
});
