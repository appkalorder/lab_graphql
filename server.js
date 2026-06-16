const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// Importar modelos y relaciones para asegurar que Express mapee correctamente la BD
const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);
Pelicula.belongsToMany(Actor, { through: Elenco });
Actor.belongsToMany(Pelicula, { through: Elenco });

const app = express();

// Ruta principal para interactuar con la API de GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Habilita la interfaz gráfica en el navegador
}));

// Asignación de puerto dinámico para compatibilidad con entornos Cloud (como Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});