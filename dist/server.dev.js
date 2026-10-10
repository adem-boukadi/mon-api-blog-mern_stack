"use strict";

var express = require('express');

var articleRoutes = require('./routes/articleRoutes');

var app = express();
var PORT = 3000;

var userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/articles', articleRoutes);
app.get('/', function (req, res) {
  res.json({
    message: "API du Blog - Serveur Moduaire Opérationnel (soc)"
  });
}); // Montage du routeur sur le préfixe /api/users

app.use('/api/users', userRoutes);
app.listen(PORT, function () {
  console.log("Serveur d\xE9marr\xE9 sur le port ".concat(PORT));
});
app.listen(PORT, function () {
  console.log("Serveur disponible sur http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
