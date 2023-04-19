module.exports = (app) => {
    app.get('/', (request, response) => {
        response.render('index.html');
    });

    app.get('/about', (request, response) => {
        response.render('about.html');
    })
}