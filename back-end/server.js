

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/dream-team', {
    useNewUrlParser: true
});

const playerSchema = new mongoose.Schema({
    name: String,
    team: String,
    position: String,
    stats: {
        fieldGoal: Number,
        assists: Number,
        rebounds: Number,
        steals: Number
    },
    rating: Number,
    image: String,
});

const teamSchema = new mongoose.Schema({
    teamName: String,
    team: String,
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}]
});

const Player = mongoose.model('Player', playerSchema);

// Model for items
const Team = mongoose.model('Team',teamSchema);

/*

FUNCTION FOR ADDING ALL PLAYERS TO DATABASE
app.post('/api/players', async (req,res) => {
    const playerList = req.body.playerList
    for(let i = 0; i < playerList.length; i++){
        let player = playerList[i];
        const newPlayer = new Player({
            name: player.name,
            team: player.team,
            position: player.position,
            stats: {
                fieldGoal: player.stats.fieldGoal,
                assists: player.stats.assists,
                rebounds: player.stats.rebounds,
                steals: player.stats.steals,
            },
            rating: player.rating,
            image: player.image,
        })
        try{
            await newPlayer.save();
        } catch (error){
            console.log(error);
            res.sendStatus(500);
        }
    }
    res.sendStatus(200);
});

*/

// Get all players from database 
app.get('/api/players/', async (req, res) => {
    try {
        let playerList = await Player.find();
        res.send(playerList);
    } catch(error){
        res.sendStatus(500);
        console.log(error);
    }
});

// Get specific player from database 
app.get('/api/players/:id', async (req, res) => {
    try {
        let player = await Player.findOne({
            _id: req.params.id,
        })
        res.send(player);
    } catch(error){
        res.sendStatus(500);
        console.log(error);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
