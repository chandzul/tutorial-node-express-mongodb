import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
import models from './models';

import routes from './routes';

// instacia del framework Express
const app = express();

// Instancia seguridad con CORNS
app.use(cors());

// instancia para recibir formularios desde un request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// inicio ejemplo de como implementar metodos CRUD
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
// fin ejemplo de como implementar metodos CRUD

// blueprint para un middleware propio
app.use((req, res, next) => {
    // req.me = models.users[1];
    req.context = {
        models,
        me: models.users[2],
    };
  
    // do something
    // console.log('Time:', Date.now())
    
    next();
});


app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);



app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);