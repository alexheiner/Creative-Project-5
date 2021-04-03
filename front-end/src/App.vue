<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
    <footer>
      <div class = "github">
        <h3><a href = "https://github.com/alexheiner/Creative-Project-3.git" target = "_blank">GitHub</a></h3>
      </div>
      <div class = "partner">
        <h3>Partner: Colby McLain</h3>
      </div>
  </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer{
    height: 300px;
    background-color: rgb(199, 199, 199);
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

a {
  color: black;
}
</style>
