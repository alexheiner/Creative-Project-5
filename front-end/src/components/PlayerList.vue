<template>
  <div class="wrapper">
    <div class="players">
      <header>
        <h1>Players List</h1>
      </header>
            <router-link class="player" v-for="player in players" :key="player.id" :to="'/player-info/' + player.id">
        <div class="row">
          <div class = "row-flex-wrap">
              <div class = "row-flex">
                <div class = "image">
                  <img :src="'/Images/Players/'+player.image + '.png'">
                </div>
                <div class = "name">
                  <h3>{{player.name}}</h3>
                </div>
                <div class = "team">
                  <p>{{player.team}}</p>
                </div>
                <div class = "add-to-team">
                  <div class = "add-button">
                    <p>+</p>
                  </div>
                </div>
              </div>
          </div>
          
        </div>
            </router-link>
        <!-- <div class="image">
          <img :src="'/images/players/'+player.image">
        </div>
        <div class="price">

          <button @click = add(product) class="auto">Add to Cart</button>
        </div> -->
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    // add(product){
    //   this.$root.$data.cart.push(product);
    // }

  },

  name: 'PlayerList',
  props: {
    players: Array
  },
  computed: {
    // addToTeam(player){
    //   this.$root.$data.players.currentTeam.push(player)
    // }
  }
}
</script>

<style scoped>

.wrapper {
  border: 2px solid black;
  margin-right: 100px;
}

header h1 {
  padding: 21px 0;
  margin: 0 0 15px 0;
  text-align: center;
  border-bottom: 2px solid black;
  background-color: rgb(138, 207, 138);
}

.row-flex:hover {
  cursor: pointer;
  background-color: rgb(189, 223, 255);
  border: 2px solid blue;
}
.row-flex {
  background-color: rgb(231, 231, 231);
  padding: 0 5px;
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  border: 2px solid white;
  margin-bottom: 5px;
  transition: all ease-in 0.2s;
}

.name, .team {
  width: 200px;
  text-align: left;
}

.name:hover {
  text-decoration: underline;
  cursor: pointer;
}

.add-button {
  padding: 0 10px;
}

.add-button:hover {
  cursor: pointer;
}

.image img{
  width: 50px;
}

.add-to-team {
  visibility:hidden;
}

a{
  text-decoration: none;
  color: black;
}

button {
  padding: 10px;
  cursor: pointer;
}

@media (max-width: 950px) {

  .wrapper {
    border: 2px solid black;
    margin-right: 0;
}

}


</style>