const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


// MÉTODOS HTTP
// GET: Pegar uma informação (Listar usuários, buscar usuários)
// POST: Criar alguma informação (salvar usuário, cadastrar)
// PUT: Editar alguma informação
// DELETE: Excluir alguma informação

// TIPOS DE PARÂMETROS
// Query Parms: Ficam visíveis na URL da aplicação, podendo ser usados para filtros, ordenação, paginação (request.query)
// Route Parms: Exclusivamnte para PUT e DELETE. Identificar um recurso na alteração ou remoção (request.parms)
// Body: Dados para criação/alteração deu m registro (request.body)

// MongoDB (Não-relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put("/devs/:id", DevController.update);
routes.delete("/devs/:id", DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
