module.exports = (app, fs) => {
  app.get('/', (request, response) => {
    response.render('index', {
      title: 'My Home',
      length: 5,
    });
  });
};
