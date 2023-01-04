<template>
  <div className="App">
    <Sidebar/>
    <div class="pageContent">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>
<script setup>
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
@media (max-width: 768px) {
  *{
    font-size: 0.8rem;
  }
  .App main {
    padding-left: 5.3rem;
  }

  html, body{
    overflow-x: hidden;
  }
}
</style>
<script>
export default{
  name:'App',
}
</script>