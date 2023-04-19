module.exports = (app, fs) => {
  app.get('/', (request, response) => {
    response.render('index', {
      title: 'My Home',
      length: 5,
    });
  });

  app.get('/users', (request, response) => {
    fs.readFile(__dirname + '/../data/' + 'user.json', 'utf8', (error, data) => {
      response.end(data);
    });
  });

  app.get('/users/:username', (request, response) => {
    fs.readFile(__dirname + '/../data/user.json', 'utf8', (error, data) => {
      const users = JSON.parse(data);
      response.json(users[request.params.username]);
    });
  });

  app.post('/addUser/:username', (request, response) => {
    let result = {};
    const username = request.params.username;

    if (!request.body['password'] || !request.body['name']) {
      result['success'] = 0;
      result['error'] = 'invalid request';

      response.json(result);

      return;
    }

    fs.readFile(__dirname + '/../data/user.json', 'utf8', (error, data) => {
      let users = JSON.parse(data);

      if (users[username]) {
        result['success'] = 0;
        result['error'] = 'duplicate';

        response.json(result);

        return;
      }

      users[username] = request.body;

      fs.writeFile(
        __dirname + '/../data/user.json',
        JSON.stringify(users, null, '\t'),
        'utf8',
        (error, data) => {
          result = { success: 1 };
          response.json(result);
        }
      );
    });
  });

  app.put('/updateUser/:username', (request, response) => {
    let result = {};
    const username = request.params.username;

    if (!request.body['password'] || !request.body['name']) {
      result['success'] = 0;
      result['error'] = 'invalid request';

      response.json(result);

      return;
    }

    fs.readFile(__dirname + '/../data/user.json', 'utf8', (error, data) => {
      let users = JSON.parse(data);
      users[username] = request.body;

      fs.writeFile(
        __dirname + '/../data/user.json',
        JSON.stringify(users, null, '\t'),
        'utf8',
        (error, data) => {
          result = { success: 1 };
          response.json(result);
        }
      );
    });
  });

  app.delete('/deleteUser/:username', (request, response) => {
    let result = {};

    fs.readFile(__dirname + '/../data/user.json', 'utf8', (error, data) => {
      let users = JSON.parse(data);

      if (!users[request.params.username]) {
        result['success'] = 0;
        result['error'] = 'not found';

        response.json(result);

        return;
      }

      delete users[request.params.username];

      fs.writeFile(
        __dirname + '/../data/user.json',
        JSON.stringify(users, null, `\t`),
        'utf8',
        (error, data) => {
          result['success'] = 1;
          response.json(result);

          return;
        }
      );
    });
  });
};
