require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./src/api/notes');
const NotesService = require('./src/services/postgres/NotesService');
const NotesValidator = require('./src/validator/notes');
 
const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    // port: 8080,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
 
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();