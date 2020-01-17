const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const http = require('http')
const routes = require('./routes')
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://glauberbrack:CVSlRkBXlliFQuwI@cluster0-1a75u.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors());
app.use(express.json());
app.use(routes);


// Endereço padrão da aplicação. 
//Quando acesso uma rota, eu tenho uma requisição (frontend) que possui uma resposta (backend).

// Porta para acessar pelo localhost
server.listen(3333);

