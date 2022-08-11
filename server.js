const express = require('express');
const app = express();
const http = require('http').createServer(app);


const port = process.env.PORT || 3000;

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

//Rutas web
app.use('/', require('./router/RutasWeb'));


app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})