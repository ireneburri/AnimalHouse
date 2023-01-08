<template>
<main>
  <div class="text-center">
    <h3>Log Out</h3>
    <p>Are you sure you want to log out?</p>
    <button @click="handleYes" class="btn btn-primary" style="background-color: var(--dark-alt); border: 1px solid var(--dark)">yes</button>
  </div>
</main>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "vueLogout",
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
    handleYes(){
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
      console.log(localStorage.getItem('token'))
      this.$store.dispatch('user', null)
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>
.text-center {
  text-align: center!important;
  margin:0 auto ;
  margin-top: 5% !important;
  width:30%;
  background-color: white;
  border-radius: 20px;
  border:1px solid var(--dark-alt);
  color: var(--dark)
}
@media (max-width: 768px) {
  .text-center{
    width:70%
  }
}
</style>