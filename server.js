const express = require('express');
const articleRoutes =require('./routes/articleRoutes');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());


app.use('/api/articles', articleRoutes);

app.get('/', (req, res) => {
    res.json({ message:"API du Blog - Serveur Moduaire Opérationnel (soc)"});
});






// Montage du routeur sur le préfixe /api/users
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Serveur disponible sur http://localhost:${PORT}`);
});

