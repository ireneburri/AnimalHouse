<template>
  <div className="App">
    <Sidebar/>
    <div class="pageContent">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name:'vueApp',
  async created() {
    console.log('username: ', localStorage.getItem('username'))
    if(localStorage.getItem('username')!==null){
      this.user=await axios.get(`https://site212224.tw.cs.unibo.it/user/username/${localStorage.getItem('username')}`)
          .then((response)=>{
            localStorage.setItem('username', response.data[0].username)
            this.$store.dispatch('user', response.data[0])
          })
    }
  }
}
</script>
<script  setup>
import Sidebar from './components/sidebar.vue'
import Header from './components/Header'
</script>

<style>
:root {
  --primary: #DABDAC;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #654321;
  --dark-alt: #CD853F;
  --light: #fff8ed;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
  font-size: 1rem;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.App {
  display: flex;
}

.App main {
  flex: 1 1 0;
  padding: 0 2rem;
  margin-top: 3rem;
}
.pageContent{
  display:flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%
}
@media (max-width: 1024px) {

  .App main {
    padding-left: 5.3rem;
  }
  @media (max-width: 1024px) {
    html, body{
      overflow-x: hidden;
    }
  }
}
</style>