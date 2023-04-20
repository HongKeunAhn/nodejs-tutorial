module.exports = (app, fs) => {
  app.get('/login/:username/:password', (request, response) => {
    let session;
    session = request.session;

    fs.readFile(__dirname + '/../data/user.json', 'utf8', (error, data) => {
      let users = JSON.parse(data);

      const username = request.params.username;
      const password = request.params.password;

      let result = {};

      if (!users[username]) {
        result['success'] = 0;
        result['error'] = 'not found';

        response.json(result);

        return;
      }

      if (users[username]['password'] == password) {
        result['success'] = 1;
        session.username = username;
        session.name = users[username]['name'];

        response.json(result);
      } else {
        result['success'] = 0;
        result['error'] = 'incorrect';

        response.json(result);
      }
    });
  });

  app.get('/logout', (request, response) => {
    session = request.session;

    if (session.username) {
      request.session.destroy((error) => {
        if (error) {
          console.log(error);
        } else {
          response.redirect('/');
        }
      });
    } else {
      response.redirect('/');
    }
  });
};
