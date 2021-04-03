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
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const playerSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
    },
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
});

const Player = mongoose.model('Player', playerSchema);

// Model for items
const Team = mongoose.model('Team',teamSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));
