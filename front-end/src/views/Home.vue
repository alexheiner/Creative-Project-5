<template>
  <div class="home">
    <BuildTeam />
  </div>
</template>



<script>
import BuildTeam from '@/components/BuildTeam.vue';
import axios from 'axios';
export default {
  name: 'home',
  components: {
    BuildTeam
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>


<style scoped>


</style>