<template>
<h2>Are you sure you want to log out?</h2>
  <button @click="handleYes">yes</button>
  <button @click="handleNo">no</button>
</template>

<script>
export default {
  name: "vueLogout",
  methods:{
    handleYes(){
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      console.log(localStorage.getItem('token'))
      this.$router.push('/')
    },
    handleNo(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>