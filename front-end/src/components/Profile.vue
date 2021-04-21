<template>
  <div class="main">
    <div class = "user-info">
      <div class="menu">
        <h2>{{user.firstName}} {{user.lastName}}</h2>
      </div>
      <div class="username">
        <h2>@{{user.username}}</h2>
      </div>
    </div>
    <div class="simple-stats">
      <div class="games-played">
        <p>Number of Games Played</p>
        <p>{{ this.numGames }}</p>
      </div>
      <div class="wins">
        <p>Wins</p>
        <p>{{ this.numWins }}</p>

      </div>
      <div class="losses">
        <p>Losses</p>
        <p>{{ this.numLosses }}</p>
      </div>
      <div class="win-ratio">
        <p>Win/Loss Ratio</p>
        <p>{{ this.winRatio }}%</p>
      </div>
    </div>
    <div class="list-stats">
      <div class="team-list">
        <h2>Teams</h2>
        <div v-for="team in this.teamList" :key="team._id">
          <p>{{team.teamName}}</p>
        </div>
      </div>
      <hr>
      <div class="score-list">
        <h2>Scores</h2>
        <p class = "score-note">(Your Score-Opponent Score)</p>
        <div v-for="game in this.gameList" :key="game._id">
          <p>{{game.userPoints}}-{{game.oppPoints}}</p>
        </div>
      </div>
    </div>
    <div v-if="this.$root.$data.user">
      <div class = "logout-button">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template> 

<script>
import axios from 'axios';


export default {
  name: 'Profile',
    components: {

  },
  data() {
    return {
      teamList: [],
      gameList: [],
      numWins: 0,
      numGames: 0,
      numLosses: 0,
      winRatio: 0,
    }
  },
  created() {
    this.getTeams();
    this.getGames();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getTeams() {
      try{
        let response = await axios.get('/api/team');
        this.teamList = response.data;
        return true;
      } catch (error){
        console.log(error);
      }
    },
    async getGames() {
      try{
        let response = await axios.get('/api/games');
        this.gameList = response.data;
        this.numGames = this.gameList.length;
        for(let i = 0; i < this.gameList.length; i++){
          let game = this.gameList[i];
          if(game.userPoints > game.oppPoints){
            this.numWins +=1;
          }
          else{
            this.numLosses +=1;
          }
        }
        this.winRatio = 100* (this.numWins/this.numGames);
        return true;
      } catch (error){
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

.logout-button {
  text-align: center;
}

.user-info {
  display: flex;
  padding: 0 50px;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logout-button button {
  border-radius: 5px;
  margin-top: 50px;
  outline: none;
  border: none;
  padding: 5px 25px;
  cursor: pointer;
  background-color:rgb(138, 207, 138);
}

.logout-button button:hover {
  background-color:rgb(100, 160, 100);

}

.score-note {
  color: grey;
}

.menu h2 {
  font-size: 40px;
}

.games-played, .wins, .losses, .win-ratio {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: rgb(231, 231, 231);
  padding-left: 20px;
  padding-right: 20px;
}

.list-stats {
  margin-left: 50px;
  margin-right: 50px;
}

</style>