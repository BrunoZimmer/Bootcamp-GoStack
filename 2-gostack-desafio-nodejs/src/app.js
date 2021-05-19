const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; 
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
    dislikes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryFind = repositories.find(repository => repository.id === id);

  if(!repositoryFind){
    return response.status(400).json({ error: "repository not found" });
  }

  const { title, url, techs, likes } = request.body;  

  const repository = {
    id: repositoryFind.id,
    title: title,
    url,
    techs,
    likes: repositoryFind.likes
  };
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  repositories[repositoryIndex] = repository; 
  
  return response.json(repositories);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryFind = repositories.find(repository => repository.id === id);

  if(!repositoryFind){
    return response.status(400).json({ error: "repository not found" });
  }
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  repositoryExist = !repository? response.status(400).send():1;

  repository.likes += 1;

  return response.json(repository);
});

app.post("/repositories/:id/dislike", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  repositoryExist = !repository? response.status(400).send():1;

  repository.dislikes += 1;

  return response.json(repository);
});

module.exports = app;
