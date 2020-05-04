const express = require('express');
const server = express();
server.use(express.json());
const shortid = require('shortid')
let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Actually Tarzan's wife"
    }
]
//returns server status?
server.get('/', (req, res) => {
    res.json({ api: 'Up and running!!' })
});
server.post('/api/users', (req, res) => {
    const usersInfo = req.body;
 console.log(usersInfo.name)
    if (usersInfo.hasOwnProperty("name") &&  usersInfo.hasOwnProperty("bio")) {
        users.push(usersInfo);
        res.status(201).json(usersInfo);
    } else {
        res.status(400)
            .json({ errorMessage: "Please provide a name and bio for the user." })
    }
})
//returns array of users
server.get('/api/users', (req, res) => {
    res.json(users);
})
//return the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    res.json(`users.${id}`)
})
server.listen(8000, () => console.log("\n ==API is running==\n"));