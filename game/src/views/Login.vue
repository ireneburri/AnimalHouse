<template>
  <main>
  <div class="text-center">
    <form class="form-signin" @submit.prevent="handleSubmit">
    <h3>Login</h3>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="username" placeholder="Username" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
      </div>
      <button class="btn btn-primary" style="background-color: var(--dark-alt); border: 1px solid var(--dark)">Login</button>
    </form>
  </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "vueLogin",
  data(){
    return{
      username:'',
      password:'',
    }
  },
  methods:{
    async handleSubmit(){
      const response= await axios.post('https://site212224.tw.cs.unibo.it/auth/login/user', {
        username:this.username,
        password: this.password
      })
      console.log(response)
      localStorage.setItem('token', response.data.authority)

      if(localStorage.getItem('token')!==null){
        this.user=await axios.get(`https://site212224.tw.cs.unibo.it/user/username/${this.username}`)
            .then((response)=>{
              localStorage.setItem('username', response.data[0].username)
              this.$store.dispatch('user', response.data[0])
            })
      }
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('username'))
      this.$router.push('/')

    },
  },
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  color:black;
}
.text-center {
  text-align: center!important;
  margin:0 auto ;
  width:30%;
  background-color: white;
  border-radius: 20px;
  border:1px solid var(--dark-alt)
}
@media (max-width: 768px) {
  .text-center{
    width:70%
  }
}
</style>