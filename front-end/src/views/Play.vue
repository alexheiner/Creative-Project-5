<template>
    <div class = "wrapper">
        <div class="play">
            <header class = "play-header" >
                <h1>Play</h1>
            </header>
        </div>
        <div class = "play-flex">
            <div class = "user-team">
                <h1>Your Dream Team</h1>
                <div v-for="player in userTeam" :key="player.id">
                  <p>{{player.name}}</p>
                </div>
            </div>
            <div class = "random-team">
                <h1>Generated Dream Team</h1>
                <div v-if="genTeam.length > 0">
                  <div v-for="player in genTeam" :key="player.id">
                    <p>{{player.name}}</p>
                  </div>
                </div>
            </div>
        </div>
        <div class = "ranking-flex">
            <div class = "user-rank">
                <div class = "user-rank-flex">
                    <div class = "user-rank-text">
                        <p>Your team's average rank: {{ userAveRank }}</p>
                    </div>
                </div>
            </div>
            <div class = "random-rank">
                <div class = "random-rank-flex">
                    <div class = "random-rank-text">
                        <p>Generated team's average rank: {{ genAveRank }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="play-winner">
            <header class = "winner-header" >
                <h1>Final Score</h1>
            </header>
            <div class = "score-list">
              <div class = "user-score">
                <p>Your score: {{ userScore }}</p>
              </div>
              <div class = "user-score">
                <p>Opponent score: {{ genScore }}</p>
              </div>
            </div>
            <div v-if="userWon == true">
              <p>Winner! Congrats, your dream team won the championship!</p>
            </div>
            <div v-else>
              <p>Your team lost! Better luck next season.</p>
            </div>
        </div>
        <div class = "play-again">
          <router-link to="/">
            <button>Play Again</button>
          </router-link>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Play',
  components: { 
    
  },
  data(){
    return{
      genTeamArr: [],
      userWon: false,
      userScore: 0,
      genScore: 0,
      genAveRank: 0,
      userAveRank: 0,
    }
  },
  computed: {
    genTeam: function(){
      return this.genTeamArr;
    },
    userTeam: function(){
        return this.$root.$data.currentTeam;
    }
  },

  created(){
      // reset values
      this.genTeamArr = [];
      this.userWon = false;
      this.userScore = 0;
      this.genScore = 0;
      this.genAveRank = 0;
      this.userAveRank = 0;

      let min = 0;
      let max = 49;
      let genPlayers = []
      let isDone = false;

      while(!isDone){
        let num = Math.floor((Math.random() * max) + min);
        console.log(num);
        let player = this.$root.$data.players[num];
        let isInList = genPlayers.includes(player); 
        let isInTeamList = this.$root.$data.currentTeam.includes(player);
        if(!isInList && !isInTeamList){
          genPlayers.push(player);
        }
        if(genPlayers.length === 5) isDone = true;
      }
      this.genTeamArr = genPlayers;

    // USERS TEAM AVERAGE
    let totalUserRating = 0;
    for(let i = 0; i < this.$root.$data.currentTeam.length; i++){
      totalUserRating += this.$root.$data.currentTeam[i].rating;
    }
    let aveUserRating = totalUserRating / 5;
    this.userAveRank = aveUserRating;
     // GENERATED TEAM AVERAGE
    let totalGenRating = 0;
    for(let i = 0; i < this.genTeamArr.length; i++){
      totalGenRating += this.genTeamArr[i].rating;
    }
    let aveGenRating = totalGenRating / 5;

    this.genAveRank = aveGenRating;

    // FIND WINNING RATIO 
    let winnerRatio = 0;
    if(aveUserRating > aveGenRating){
      this.userWon = true;
      winnerRatio = aveGenRating / aveUserRating;
      this.userScore = Math.floor((Math.random() * 110) + 50);
      this.genScore = Math.floor(this.userScore * winnerRatio);
    }
    else {
      winnerRatio = aveUserRating / aveGenRating;
      this.genScore = Math.floor((Math.random() * 110) + 50);
      this.userScore = Math.floor(this.genScore * winnerRatio);
    }

    // GENERATE WINNERS SCORE
    

  }

}


</script>

<style scoped>

.wrapper {
  line-height: 1.6;
}

.play-again {
  text-align: center;
  margin-top: 150px;
}

.play-again button {
  width: 200px;
  padding: 15px;
  border-radius: 5px;
  background-color: rgb(138, 207, 138);
}

.score-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-score {
  margin-right: 20px;
}

.play-header h1 {
    font-size: 50px;
}

header, .play-winner {
    text-align: center;
}

.play-flex {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.ranking-flex {

    flex-wrap: wrap;
    justify-content: center;
}

.user-rank {
  flex-basis: 50%;
}

.ranking-flex p {
    font-size: 35px;
}

.user-rank-text {
    margin-right: 20px;
}

.user-team, .random-team {
    border: 2px solid black;
    padding-left: 30px;
    padding-right: 30px;
    width: 30%;
}

.user-team h1, .random-team h1{
    text-align: center;
}

.user-team, .random-team p {
    text-align: left;
}

.play-winner {
    margin-bottom: 50px;
}

.winner-header h1 {
    font-size: 35px;
}

.play-winner p {
    font-size: 26px;
}

.user-rank-text p,
.random-rank-text p {
  font-weight: bold;
  text-align: center;
}

  .play-winner {
    border: 2px solid black;
  }


@media (max-width: 850px) {
  .play-flex {
    display: block;
  }

  .user-team {
    margin-bottom: 50px;
  }

  .user-team, .random-team {
    width: auto;
  }

  .user-team h1,
  .random-team h1{
    font-size: 28px;
  }

  .user-rank-text p,
  .random-rank-text p{
    font-size: 20px !important;
  }

  .score-list {
    display: block;
  }

  .play-winner {
    border: 2px solid black;
  }

}

</style>