<template>
  <div class="home">
    <div class = "header-instructs">
      <header class = "welcome-header" >
        <h1>Wecome to the NBA Dream Team Creator</h1>
      </header>
      <ol>
        <li>Choose 5 players to compete against a randomly generated team</li>
        <li>Click on a player the "Players List" to see their profile</li>
        <li>Click the "Add to team" button in a player's profile to add them to your team</li>
        <li>When you have selected your team click "Play Opponent" to face off against your opponent</li>
        <li>You can modify your team anytime by removing them from the "Current Team" list</li>
      </ol>
    </div>
    <div class = "search">
      <input v-model="searchText" id = "search" placeholder="Player's Name" />
    </div>
    <div class = "player-flex">
      <div class = "player-list">
        <PlayerList :players="players" />
      </div>
      <div class = "team-list">
        <div class = "team-list-wrap">
          <header class = "team-header">
            <h1>Current Team</h1>
          </header>
          <div class = "team-player-list">
          <div v-for="player in team" :key="player.id">
            <div class = "team-flex">
              <div class = "player-name">
                <p>{{ player.name }}</p>
              </div>
              <div class = "remove-player" @click="removePlayer(player)">
                <h3>X</h3>
              </div>
            </div>
            <hr>
          </div>
          </div>
        </div>
        <div class = "play">
          <div class = "add-teams-message">
            <p>You need to add {{ teamsLeft }} to play!</p>
          </div>
          <div v-if="teamsLeft > 0" class = "disabled-btn center">
              <button disabled id = "play">Play Opponent</button>
          </div>
          <div v-if="teamsLeft == 0" class = "enabled-btn center">
            <router-link to="/play">
              <button id = "play">Play Opponent</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PlayerList from "../components/PlayerList.vue";
export default {
  name: 'Home',
  components: {
    PlayerList
  },
  data(){
    return{
      searchText: ''
    }
  },
  computed: {
    players(){
      return this.$root.$data.players.filter(player => player.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    },
    team: function(){
        return this.$root.$data.currentTeam;
    },
    teamsLeft: function(){
        let num =  5 - this.$root.$data.currentTeam.length;
        return num
    }
    // currentTeam(player){
    //   this.currentTeam.push(player)
    // }
  },
  methods: {
    removePlayer(player){
      this.$root.$data.currentTeam = this.$root.$data.currentTeam.filter(listPlayer => player.id !== listPlayer.id);
    },

  },

}
</script>



<style scoped>
.header-instructs {
  width: max-content;
  margin: 0 auto;
  line-height: 1.6;
}

.search {
  margin-top: 75px;
  text-align: center;
}

.search input {
  padding: 10px;
  border-radius: 5px;
}

#search {
  margin-right: 15px;
  outline: none;
  border: 1px solid black;
  width: 50%;
}

.player-flex {
  margin-top: 100px;
  display: flex;
}

.player-list {
  flex-basis: 70%;
}

.team-list {
  flex-basis: 30%;
}

.team-list-wrap {
  min-height: 500px;
}

.team-list-wrap{
  border: 2px solid black;
}

.team-header {
  text-align: center;
  border-bottom: 2px solid black;
}

.team-player-list {
  padding: 15px;
}

.team-header h1{
  margin: 0;
  padding: 21px 0;
  background-color: rgb(138, 207, 138);
}

.team-flex {
  display: flex;
  align-items: center;
}

.player-name {
  flex-basis: 95%;
}

.remove-player {
  cursor: pointer;
}

button {
  padding: 15px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed !important;
}

.center {
  text-align: center;
}

@media (max-width: 1200px) {

  .player-flex {
    justify-content: center;
  }
  .player-list {
    flex-basis: 50%;
  }

  .team-list {
    flex-basis: 50%;
  }
}

@media (max-width: 950px) {

  .player-flex {
    display: block;
  }

  .team-list {
    margin-top: 50px;
  }

}

@media (max-width: 800px) {

  .header-instructs {
    width: auto;
  }

  .header-instructs h1{
    text-align: center;
  }

}

</style>