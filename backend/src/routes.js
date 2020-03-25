const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')

routes.post('/create_ongs', ongController.create);
routes.get('/list_ongs', ongController.index);
routes.post('/create_incidents', incidentsController.create);
routes.get('/list_incidents', incidentsController.index);
routes.delete('/delete_incident/:id', incidentsController.delete);
routes.get('/list_especific_incidents_of_ong', profileController.list_especific_incidents);
routes.post('/ong_login', sessionController.ong_login);
module.exports = routes;