<template>
  <div class="build-team">
    <div v-if="this.$root.$data.user">
      <button @click="logout">Logout</button>
    </div>
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
      <div v-if="this.$root.$data.user">
        <div class = "load-prev-team">
          <header>
            <h1>Want to reload a previously used team?</h1>
          </header>
          <div class = "load-team-content">
            <p>Search for your team by entering the team name below</p>
            <div id = "error-message">
              <h3>{{ loadTeamMsg }}</h3>
            </div>
            <div class = "search-input">
              <input v-model="searchTeam" type="text" id = "search-team" placeholder="Previous Team"/>
              <button @click="loadTeam()">Load Team</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class = "login-message">
          <header>
            <h2>You must login before playing!</h2>
          </header>
          <router-link to="/dashboard"><button>Login Here!</button></router-link>
        </div>
      </div>

    </div>
    <div v-if="this.$root.$data.user">
      <div class = "search">
        <input v-model="searchText" id = "search" placeholder="Player's Name" />
      </div>
      <div class = "player-flex">
        <div class = "player-list">
          <PlayerList :players="players" />
        </div>
        <div class = "team-list">
          <div class = "team-list-wrap">
            <div v-if="this.$root.$data.currentTeam.teamName === 'Current Team'">
              <header class = "team-header">
                <h1>{{ this.$root.$data.currentTeam.teamName }}</h1>
              </header>
            </div>
            <div v-else>
              <header class = "team-header">
                <h1>Team: {{ this.$root.$data.currentTeam.teamName }}</h1>
              </header>
            </div>
            <div class = "team-player-list">
              <div v-for="player in team" :key="player._id">
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
            <div class = "btn-flex">
              <div v-if="this.$root.$data.currentTeam.teamName !== 'Current Team'">
                <div class = "save-team-btn">
                  <button @click="clearCurrentTeam()">New Team</button>
                </div>
              </div>
              <div v-if="this.$root.$data.currentTeam.teamName !== 'Current Team'">
                <div class = "save-team-btn">
                  <button @click="saveTeam()">Save my team!</button>
                </div>
              </div>
              <div v-if="this.$root.$data.currentTeam.teamName !== 'Current Team'"> 
                <div class = "edit-name-btn">
                  <button @click="displayEdit()">Edit team</button>
                </div>
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
            <div id = "edit-team-message">
              <p>{{ editTeamMsg }}</p>
            </div>
          </div>
          <div v-if="this.$root.$data.currentTeam.teamName === 'Current Team'">
            <div>
              <div class = "team-name" id = "team-name-div-ID">
                <p>Enter a team name to save your team!</p>
                <div id = "error-message-new-team">
                  <h3>{{ newTeamErrorMsg }}</h3>
                </div>
                <div class = "input-save-flex">
                  <div class = "new-team-input">
                    <input v-model="newTeamName" type = "text" id = "team-name" placeholder="Team Name"/>
                  </div>
                  <div class = "save-new-team-btn">
                    <button @click="newTeam()">Save New Team</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.$root.$data.currentTeam.teamName !== 'Current Team'">
            <div class = "new-name-input" id = "new-name-ID">
              <p>Change team name</p>
              <input v-model="newTeamName" type = "text" id = "new-name-input" placeholder="New Team Name"/>
              <button @click="editTeamName()">Save</button>
              <button @click="hideEdit()">Cancel</button>
              <div class = "delete-team">
                <button @click="deleteTeam()">Delete Team</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class = "load-data">
      <button @click="addPlayers()">Load data</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PlayerList from "../components/PlayerList.vue";
export default {
  name: 'Home',
  components: {
    PlayerList
  },
  data(){
    return{
      searchText: '',
      newTeamName: '',
      playerList: [],
      searchTeam: '',
      currentTeamHolder: '',
      newTeamErrorMsg: '',
      editTeamMsg: '',
      loadTeamMsg: '',
    }
  },
  computed: {
    players(){
      return this.playerList.filter(player => player.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    },
    team: function(){
        return this.$root.$data.currentTeam.players;
    },
    teamsLeft: function(){
        let num =  5 - this.$root.$data.currentTeam.players.length;
        return num
    }
  },
  created() {
    //this.addPlayers();
    //if(this.$root.$data.players.length === 0){
      this.getPlayers();
    //}
  },
  methods: {
    removePlayer(player){
      this.$root.$data.currentTeam.players = this.$root.$data.currentTeam.players.filter(listPlayer => player._id !== listPlayer._id);
    },

    async saveTeam(){
      let teamId = this.$root.$data.currentTeam._id;
      try {
        let response = await axios.put(`/api/team/${teamId}/players`, {
          playerList: this.$root.$data.currentTeam.players,
        });
        this.$root.$data.currentTeam.teamName = response.data.teamName;
        this.displayTimedEditResponse('Team saved successfully');
        return true;
      } 
      catch(error){
        console.log(error);
      } 
    },

    async newTeam(){
      if(this.newTeamName.length > 0){
        if(this.newTeamName.length < 15){
          this.newTeamErrorMsg = '';
          let response = '';
          try {
              response = await axios.post('/api/team', {
              teamName: this.newTeamName,
            });
          } catch (error){
            if(error.response.status === 404){
              this.displayTimedEditResponse(`Team: ${this.newTeamName} already exists`, true);
            }
            return true;
          }
          this.newTeamName = '';
          this.$root.$data.currentTeam._id = response.data._id;
          this.saveTeam();
        }
        else {
          this.displayTimedEditResponse('Please enter a team name with less than 15 characters', true);
        }
      }
      else{
        this.displayTimedEditResponse('Please enter a valid team name', true);
      }
      
    },

    async getPlayers(){
      this.loadTeamMsg = '';
      try{
        let response = await axios.get('/api/players');
        this.playerList = response.data;
        this.$root.$data.players = response.data;
        return true;
      } catch (error){
        console.log(error);
      }
    },
    async loadTeam(){
      if(this.searchTeam.length > 0){
        this.hideErrorTeamDNE();
        try{
          let response = await axios.get(`/api/team/${this.searchTeam}`);
          this.$root.$data.currentTeam = response.data;
          this.displayTimedEditResponse(`Team: ${this.$root.$data.currentTeam.teamName} successfully loaded`, false);
          this.searchTeam = '';
          return true;
        }
        catch(error){
          if(error.response.status === 404){
            this.loadTeamMsg = 'This team does not exist';
            this.showErrorTeamDNE();
          }
        }
      }
      else {
        this.loadTeamMsg = 'Please enter a valid team name';
        this.showErrorTeamDNE();
        return;
      }
    },
    async editTeamName(){
      if(this.newTeamName.length > 0){
        if(this.newTeamName.length < 15){
          let teamId = this.$root.$data.currentTeam._id;
          try {
            let response = await axios.put(`/api/team/${teamId}` , {
              teamName: this.newTeamName,
            });
            this.newTeamName = '';
            this.$root.$data.currentTeam = response.data;
            this.displayTimedEditResponse(`Team name successfully changed to ${this.$root.$data.currentTeam.teamName}`, false);
            this.hideEdit();
            return true;
          }
          catch (error){
            if(error.response.status === 404){
              this.displayTimedEditResponse(`Team: ${this.newTeamName} already exists`, true);
            }
          }
        }
        else {
          this.displayTimedEditResponse('Please enter a team name with less than 15 characters', true);
        }
      }
      else {
        this.displayTimedEditResponse('Please enter a valid team name', true);
      }
    },

    async deleteTeam(){
      let teamId = this.$root.$data.currentTeam._id;
      try {
        await axios.delete(`/api/team/${teamId}`);
        this.displayTimedEditResponse(`Team: ${this.$root.$data.currentTeam.teamName} successfully deleted`, false);
        this.clearCurrentTeam();
        this.hideEdit();
        return true;
      }
      catch (error){
        console.log(error);
      }
    },

    clearCurrentTeam(){
      this.$root.$data.currentTeam = {
        teamName: 'Current Team',
        players: [],
      };
    },

    hideErrorTeamDNE(){
      document.getElementById("error-message").style.visibility = "hidden";
    },

    showErrorTeamDNE(){
      document.getElementById("error-message").style.visibility = "visible";
    },

    displayEdit(){
      document.getElementById("new-name-ID").style.visibility = "visible";
    },

    hideEdit(){
        document.getElementById("new-name-ID").style.visibility = "hidden";
    },

    displayTimedEditResponse(msg, isBad){
      this.editTeamMsg = msg;
      if(isBad){
        document.getElementById("edit-team-message").style.backgroundColor = "red";
      }
      else {
        document.getElementById("edit-team-message").style.backgroundColor = "rgb(192, 238, 192)";
      }
      document.getElementById("edit-team-message").style.visibility = "visible";
      setTimeout(function(){
        document.getElementById("edit-team-message").style.visibility = "hidden";
      }, 3000)
    },

    /*
    FUNCTION FOR ADDING ALL PLAYERS TO DATABASE
    */
    async addPlayers(){
      try{
        let response = await axios.post('/api/players', {
          playerList: this.$root.$data.mockPlayers,
        });
        console.log(response);
        return true;
      } catch (error){
        console.log(error);
      }
    },
    async logout(){
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
}
</script>



<style scoped>

.login-message {
  margin-top: 150px;
  text-align: center;
}

.login-message button {
  border-radius: 5px;
  margin-top: 25px;
  outline: none;
  border: none;
  padding: 5px 25px;
  cursor: pointer;
  background-color:rgb(138, 207, 138);
}

.login-message button:hover {
  background-color:rgb(100, 160, 100);

}

.load-data  {
  margin-top: 50px;
  float: right;
}

.load-data button {
  background-color: white;
}

#edit-team-message {
  background-color: rgb(192, 238, 192);
  border-radius: 5px;
  margin: 50px 20px 0 20px;
  min-width: 50%;
  padding: 15px;
  text-align: center;
  visibility: hidden;
  transition: visibility ease-in 0.5s;
}

#error-message, #error-message-new-team {
  visibility: hidden;
}

#error-message h3, #error-message-new-team h3 {
  color: red;
  text-align: center;
}

.delete-team button {
  margin: 25px 0 0 0 !important;
}

.new-name-input {
  margin-top: 50px;
  visibility: hidden;
}

.new-name-input button {
  margin-left: 25px;
}

#new-name-input {
  padding: 10px;
  border: 1px solid rgb(109, 109, 109);
  border-radius: 5px;
}

.input-save-flex {
  display: flex;
  flex-wrap: wrap;
}

.save-new-team-btn {
  margin-left: 50px;
}

.team-name {
  margin-top: 50px;
}

#team-name {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}


.load-prev-team {
  margin-top: 100px;
}

.load-prev-team p{
  padding: 0 25px
}

.search-input {

  text-align: center;
}

.search-input input, .search-input button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}

.search-input button {
  margin-left: 50px;
}

.btn-flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

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

.play button, .save-team-btn button, .save-new-team-btn button, .edit-name-btn button, .new-name-input button{
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid rgb(109, 109, 109);
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