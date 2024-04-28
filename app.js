const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

const users = [
  {
    id: 112,
    name: "Aman",
    description: "Hello, This is aman.",
  },
  {
    id: 11232,
    name: "Jack",
    description: "Hello, This is Jack.",
  },
];

app.get("/api/v1/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    const filteredResult = users.filter((user) => user[filter].includes(value));
    if (filteredResult.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).send(filteredResult);
  }

  return res.send(users);
});

app.get("/api/v1/users/:id", (req, res) => {
  const userid = parseInt(req.params.id);
  if (isNaN(userid)) {
    return res.status(400).send({ msg: "Bad Request ! Invalid Id" });
  }

  const user = users.find((user) => user.id === userid);
  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).send(user);
});

app.post("/api/v1/users", (req, res) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(newUser);
});

app.put("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUser = users.findIndex((user) => user.id === parseId);
  if (findUser == -1) return res.sendStatus(404);
  users[findUser] = { id: parseId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = users.findIndex((user) => user.id === parseId);
  if (findUserIndex == -1) return res.sendStatus(404);
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/v1/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findIndex = users.findIndex((user) => user.id === parseId);
  if (findIndex === -1) return res.sendStatus(404);
  users.splice(findIndex, 1);
  return res.sendStatus(200);
});

app.get("/api/v1/products", (req, res) => {
  res.status(200).send([
    {
      id: 301,
      name: "Colgate",
      description: "Best colgate ever.",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
