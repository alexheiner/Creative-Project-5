<template>
<div class="main">
  <div class="menu">
    <h2>{{user.firstName}} {{user.lastName}}</h2>
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