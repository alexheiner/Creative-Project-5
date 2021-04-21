<template>
  <div id="app">
    <div id="nav">
      <div class = "home-link">
        <router-link to="/"><i class="fas fa-home"></i></router-link>
      </div>
      <div class = "profile-link">
        <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
      </div>
    </div>
    <router-view/>
    <footer>
      <div class = "github">
        <h3><a href = "https://github.com/alexheiner/Creative-Project-4.git" target = "_blank">GitHub</a></h3>
      </div>
      <div class = "partner">
        <h3>Partner: Colby McLain</h3>
      </div>
  </footer>
  </div>
</template>


<style>


#nav {
  padding: 30px;
  margin-bottom: 100px;
}


#nav .fas {
  margin-right: 50px;
  height: 50px;
}

body i{
  font-size: 40px;
}

.home-link{
  float: left;
}

.home-link i {
  color: rgb(138, 207, 138);
}
.profile-link{

  float: right;
}

.profile-link i {
  color: black;
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



</style>
