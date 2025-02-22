module.exports = {
    development: {
      username: 'root',
      password: '123456',
      database: 'chatbot',
      host: 'localhost',
      dialect: 'mysql',  // Usando MySQL
    },
    test: {
      username: 'usuario',
      password: 'senha',
      database: 'nome_do_banco',
      host: 'localhost',
      dialect: 'mysql',
    },
    production: {
      username: 'usuario',
      password: 'senha',
      database: 'nome_do_banco',
      host: 'localhost',
      dialect: 'mysql',
    },
  };
  