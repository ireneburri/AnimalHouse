<template>
  <main>
    <div class="text-center">
      <form class="form-signin" @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" v-model="first_name" placeholder="First Name"/>
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" v-model="last_name" placeholder="Last Name"/>
        </div>

        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" v-model="username" placeholder="Username"/>
        </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
          </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password"/>
        </div>
        <button class="btn btn-primary btn-block" style="background-color: var(--dark-alt); border: 1px solid var(--dark)">Sign Up</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data(){
    return{
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      password_confirm:'',
      username:''
    }
  },
  methods:{
    async handleSubmit(){
      const response = await axios.post('https://site212224.tw.cs.unibo.it/user', {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm
      })
      console.log(response)
      this.$router.push('/login')
    }
  }


}
</script>

<style scoped>
.form-signin {
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  color:black
}
.text-center {
  text-align: center!important;
  margin:0 auto;
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