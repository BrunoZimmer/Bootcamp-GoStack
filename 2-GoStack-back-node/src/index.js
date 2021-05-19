const express =  require('express');
const { response } = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json())

function logRequests( request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if (!isUuid(id)) {
        return  response.status(400).json({ error: "Invalid project ID."});
    }
    return next();
}

app.use(logRequests);
app.use()

app.get('/projects', (request, response) => {
    const query = request.query;

    console.log(query)

    return response.json([
        'Project 1',
        'Project 2'
    ]);
});

app.post('/projects', (request, response) => {
    const body = request.body;

    console.log(body);

    return response.json([
        'Project 1',
        'Project 2',
        'Project 3'
    ]);
});

app.put('/projects/:id', (request, response) => {
    const params = request.params;

    console.log(params);
    
    return response.json([
        'Project 4',
        'Project 2',
        'Project 3'
    ]);
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Project 2',
        'Project 3'
    ]);
});

app.listen(3333, () => {
    console.log('✔✔');
});
