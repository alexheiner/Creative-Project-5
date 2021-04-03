<template>
    <div class = "wrapper">
        <div class="player-info">
            <header class = "player-header" >
                <h1>Player Info</h1>
            </header>
        </div>
        <div class = "info-flex">
            <div class = "player-img">
                <img :src="'/Images/Players/'+player.image + '.png'">
            </div>
            <div class = "player-details">
                <div class = "player-name">
                    <p>{{ player.name }}</p>
                </div>
                <div class = "player-team">
                    <p>{{ player.team }}</p>
                </div>
                <div class = "player-position">
                    <p>{{ player.position }}</p>
                </div>
            </div>
        </div>
        <div class = "stats-flex">
            <div class = "stats-FG">
                <p>FG%</p>
                <p>{{ player.stats.fieldGoal }}%</p>
            </div> 
            <div class = "stats-AST">
                <p>AST</p>
                <p>{{ player.stats.assists }}</p>
            </div>
            <div class = "stats-REB">
                <p>REB</p>
                <p>{{ player.stats.rebounds }}</p>
            </div>  
            <div class = "stats-STL">
                <p>STL</p>
                <p>{{ player.stats.steals }}</p>
            </div> 
            <div class = "stats-rating">
                <p>RATING</p>
                <p>{{ player.rating }}</p>
            </div> 
            <div class = "add">
                <button @click = addToTeam()>Add to team</button>
            </div>
        </div>
        <div id = "error-msg">
          <h3>{{ message }}</h3>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      amount: 0,
      player: {},
      message: '',
    } 
  },
  created() {
    this.player = this.$root.$data.players.find(player => player.id === parseInt(this.$route.params.id));
  },
  methods: {
    addToTeam(){
      let error = document.getElementById("error-msg");
      error.style.visibility = "hidden";
      this.message = '';
      if(this.$root.$data.currentTeam.length < 5){
        let isInList = this.$root.$data.currentTeam.includes(this.player);
              if(!isInList){
                this.$root.$data.currentTeam.push(this.player);
              }
                else{
                  error.style.visibility = "visible";
                  this.message = "This player is already in your team";
                }
      }
      else {
        error.style.visibility = "visible";
        this.message = "You already have the maximum of 5 players in your team";
      }
    }
  }
}


</script>

<style scoped>

.wrapper {
  min-height: 900px;
}

.player-header h1 {
    font-size: 50px;
    text-align: center;
    margin-bottom: 75px;
}

.info-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: rgb(173, 171, 171);
    border-radius: 10px;
    padding: 50px 20px;
}

.stats-flex {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}


.player-name p{
    font-size: 45px;
    margin-top: 0;
}

.player-team {
    font-size: 28px;
}

.player-img {
  margin-right: 25px;
}

.player-img img {
  width: 260px;
  height: 190px;
}

.player-position p {
  font-size: 22px;
}


.stats-flex {
    border: 2px solid black;
}

button {
  padding: 15px 25px;
  background-color: rgb(138, 207, 138);
  border-radius: 5px;
  border: none;
}

button:hover {
  cursor: pointer;
  background-color: rgb(74, 153, 74);
}

#error-msg {
  max-width: 400px;
  background-color: rgb(255, 106, 106);
  padding: 50px;
  text-align: center;
  margin: 60px auto;
  visibility: hidden;
  color: black;
  border-radius: 5px;
  line-height: 1.7;
}

.stats-flex p {
  text-align: center;
}


</style>