<template>  
  <div class="hero">
    <h1>Login/Register</h1>
    <p>Returning user? Login below!<p>
    <p>Otherwise sign up to get started.</p>
    <div class="heroBox">
      <div class="flexBox1">
        <form class="pure-form">
          <fieldset>
              <legend>Create an account</legend>
              <input placeholder="first name" v-model="firstName">
          </fieldset>
          <fieldset>
            <input placeholder="last name" v-model="lastName">
          </fieldset>
          <fieldset>
              <input placeholder="username" v-model="username">
          </fieldset>
          <fieldset>
            <input type="password" placeholder="password" v-model="password">
          </fieldset>
          <fieldset>
              <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
          </fieldset>
          </form>
          <p v-if="error" class="error">{{error}}</p>
      </div>
      <div class="flexBox2">
        <form class="pure-form space-above">
        <fieldset>
            <legend>Login</legend>
            <input placeholder="username" v-model="usernameLogin">
        </fieldset>
        <fieldset>
          <input type="password" placeholder="password" v-model="passwordLogin">
        </fieldset>
        <fieldset>
            <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
        </fieldset>
        </form>
        <p v-if="errorLogin" class="error">{{errorLogin}}</p>
      </div>
    </div>
  </div>
</template> 

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
    methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
        async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
}
</script>

<style scoped>

.home {
  margin-top: 0px;
}

.hero {
  padding: 120px;
  
}
.hero h1, .hero p {
  text-align: center;
}
.heroBox {
  padding-top: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flexBox1, .flexBox2 {
  margin: 50px;
  margin-top: 0px;
}

button {
  background-color: rgb(138, 207, 138);
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 22px;
}

input {
  font-size: 18px;
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>