const express = require('express');

const server = express();
server.use(express.json());

const shortid = require('shortid')

let users = [
    {
        // id: shortid.generate(),
        id: 1,
        name: "Jane Doe",
        bio: "Actually Tarzan's wife"
    },
    {
        // id: shortid.generate(),
        id: 2,
        name: "Mary Jane",
        bio: "Spiderman's wife"
    }
]


//returns server status?
server.get('/', (req, res) => {
    res.json({ api: 'Up and running!!' })
});


//returns array of users
server.get('/api/users', (req, res) => {
    res.json(users);
})


server.post('/api/users', (req, res) => {
    const usersInfo = req.body;
    //id?
    usersInfo.id = shortid.generate();

    if (usersInfo.hasOwnProperty("name") && usersInfo.hasOwnProperty("bio")) {
        users.push(usersInfo);
        res.status(201).json(usersInfo);
    } else {
        res.status(400)
            .json({ errorMessage: "Please provide a name and bio for the user." })
    }
})


//return the user object with the specified id.
server.get('/api/users/:id', (req, res) => {

    const reqId = Number(req.params.id);

    let userID = users.filter(user => user.id == reqId)


    if (userID.length < 1) {
        res.status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else {
        res.json(userID)
    }
})


server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    users = users.filter(item => item.id != id);
    if (users.length < 1) {
        res.status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(200).json(users);
    }

})

server.put('/api/users/:id', (req,res) => {
    const id = Number(req.params.id);
    const userInfo = req.body;

    // updatedUser = users.filter(item => item.id == id);
    if (userInfo.length < 1 ) {
        res.status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else if (userInfo.name.length === 0 || userInfo.bio.length ===0)  {
        res.status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    }else {
        users.push(userInfo)
        res.status(200).json(users);
    }

})
server.listen(8000, () => console.log("\n ==API is running==\n"));

