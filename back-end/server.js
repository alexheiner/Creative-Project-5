

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/dream-team', {
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


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
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    username: String,
});


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
});

const gameSchema = new mongoose.Schema({
  userPoints: Number,
  oppPoints: Number,
  teamName: String,
  username: String,
});

const Game = mongoose.model('Game', gameSchema);

const Player = mongoose.model('Player', playerSchema);

// Model for items
const Team = mongoose.model('Team',teamSchema);



userSchema.pre('save', async function(next) {
    if (!this.isModified('password'))
        return next();
    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}); 

userSchema.methods.comparePassword = async function(password) {
  try {

    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User',userSchema);

const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    req.user = user;
  } catch (error) {
    return res.status(403).send({
      message: "not logged in"
    });
  }

  next();
};


// create new user
app.post('/api/users', async (req, res) => {
  // Make sure that the form coming from the browser includes all required fields,
  // otherwise return an error. A 400 error means the request was
  // malformed.
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password)
    return res.status(400).send({
      message: "first name, last name, username and password are required"
    });

  try {

    //  Check to see if username already exists and if not send a 403 error. A 403
    // error means permission denied.
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });

    // create a new user and save it to the database
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    // set user session info
    req.session.userID = user._id;

    // send back a 200 OK response, along with the user that was created
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});



// login a user
app.post('/api/users/login', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // password, otherwise return an error.
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  lookup user record
    const user = await User.findOne({
      username: req.body.username
    });
    // Return an error if user does not exist.
    if (!user)
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // Return the SAME error if the password is wrong. This ensure we don't 
    // leak any information about which users exist.
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // set user session info
    req.session.userID = user._id;

    return res.send({
      user: user
    });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get logged in user
app.get('/api/users', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get user by id
app.get("/api/users/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findOne({
      _id: id,
    })
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// logout
app.delete("/api/users/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});



/*
FUNCTION FOR ADDING ALL PLAYERS TO DATABASE
*/
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

app.post('/api/team', validUser, async (req,res) => {
    let teamName = req.body.teamName;
    let team = await Team.findOne({
        teamName: teamName,
    });
    if(team){
        res.sendStatus(404);
        return;
    }
    else{
        let newTeam = new Team({
            teamName: teamName,
            players: [],
            username: req.user.username,
        })
    
        try{
            await newTeam.save();

        } catch (error){
            console.log(error);
            res.sendStatus(500);
        }
        res.send(newTeam);
    }
});

app.put('/api/team/:id/players', async (req,res) => {
    let playerList = req.body.playerList;
    try {
        let team = await Team.findOne({
            _id: req.params.id,
        }).populate('players');
        if(!team){
            res.sendStatus(404);
            return;
        }
        team.players = playerList;

        await team.save();
        res.send(team);
        return;
    } catch(error){
        res.sendStatus(500);
        console.log(error);
    }
});


// get team by specific team name
app.get('/api/team/:name', validUser, async (req, res) => {
    try{
        let team = await Team.findOne({
            teamName: req.params.name,
            username: req.user.username
        }).populate('players');
        if(!team){
            res.sendStatus(404);
            return;
        }
        res.send(team);
    } catch (error){
        console.log(error);
    }
});

// get all teams that belong to a user
app.get('/api/team', validUser, async (req, res) => {
  try{
      let team = await Team.find({
          username: req.user.username,
      }).populate('players');
      if(!team){
          res.sendStatus(404);
          return;
      }
      res.send(team);
  } catch (error){
      console.log(error);
  }
});

app.put('/api/team/:id', async (req, res) => {
    let newName = req.body.teamName;
    try{
        let existingTeam = await Team.findOne({
            teamName: newName,
        });
        if(existingTeam){
            res.sendStatus(404);
            return;
        }
        let team = await Team.findOne({
            _id: req.params.id,
        }).populate('players');
        team.teamName = newName;
        await team.save();
        res.send(team);
    } catch (error){
        console.log(error);
    }
});

app.delete('/api/team/:id', async (req, res) => {
    try{
        let team = await Team.deleteOne({
            _id: req.params.id,
        });
        res.sendStatus(200);
    } catch (error){
        console.log(error);
    }
});

// GAMES
app.post('/api/games', validUser, async (req, res) => {
  let gameModel = req.body.gameModel;

  let newGame = new Game({
    userPoints: gameModel.userPoints,
    oppPoints: gameModel.oppPoints,
    teamName: gameModel.teamName,
    username: req.user.username,
  });

  try {
    await newGame.save();
  } 
  catch (error){
      console.log(error);
      res.sendStatus(500);
  }
});

app.get('/api/games', validUser, async (req, res) => {
  try {
    let games = await Game.find({
      username: req.user.username,
    });
    res.send(games);
  } 
  catch (error){
      console.log(error);
      res.sendStatus(500);
  }
});



app.listen(3003, () => console.log('Server listening on port 3003!'));
