<template>
  <div class="main">
    <div v-if="this.$root.$data.user">
      <button @click="logout" style="float: right;">Logout</button>
    </div>
    <div class="menu">
      <h2>{{user.firstName}} {{user.lastName}}</h2>
    </div>
    <div class="simple-stats">
      <div class="games-played">
        <p>Number of Games Played</p>
        <p>75</p>
      </div>
      <div class="wins">
        <p>Wins</p>
        <p>55</p>
      </div>
      <div class="losses">
        <p>Losses</p>
        <p>20</p>
      </div>
      <div class="win-ratio">
        <p>Win/Loss Ratio</p>
        <p>55:20 = 2.75:1</p>
      </div>
    </div>
    <div class="list-stats">
      <div class="team-list">
        <h2>Teams</h2>
        <p>one</p>
        <p>two</p>
        <p>three</p>
      </div>
      <hr>
      <div class="score-list">
        <h2>Scores</h2>
        <p>112-98</p>
        <p>78-101</p>
        <p>99-97</p>
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

    }
  },
  created() {

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

    },
  }
}
</script>

<style scoped>

.menu h2 {
  margin-left: 50px;
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