import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
import routes from './routes';
import models, { connectDb } from './models';

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
        me: models.users[1],
    };
  
    // do something
    // console.log('Time:', Date.now())
    
    next();
});

// Rutas definidas en nuestra app
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// inicializar servidor web y base de datos
const eraseDatabaseOnSync = true;

connectDb().then(async () => {

    if (eraseDatabaseOnSync) {
        await Promise.all([
          models.User.deleteMany({}),
          models.Message.deleteMany({}),
        ]);

        createUsersWithMessages();
     }

    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});

const createUsersWithMessages = async () => {
  
    // seed crear usuario en la bd
    const user1 = new models.User({
        username: 'rwieruch',
    });

    const user2 = new models.User({
        username: 'ddavids',
    });

    // seed crear mensaje de un usuario en la bd
    const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
    await user2.save();
};