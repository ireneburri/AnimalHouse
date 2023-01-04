<template>

  <main class="curiosityPage">
    <div class="row">
      <div class="col-md-6 changeAnimal">
        <img v-bind:src="animalImg">
        <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" @click="switchAnimal">switch
          for {{ animalChange }} facts</button>
      </div>

      <div v-if="animal" class="col-md-6 comicCloud">

        <p>{{fact}}</p>
        <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" @click="setDogFacts">Dog Facts</button>
      </div>
      <div v-else class="col-md-6 comicCloud">
        <img src="/images/comic_cloud.png">
        <p>{{fact}}</p>
        <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" @click="setCatFacts">Cat Facts</button>
      </div>
    </div>

  </main>
</template>

<script>
import axios from "axios";

export default {
  name:'vueDog',
  data(){
    return{
      fact:'click the button for a dog fact',
      animal:true,
      animalChange:'cat',
      animalImg:'/images/jake.png'
    }
  },
  methods:{
    switchAnimal(){
      this.animal=!this.animal
      if(this.animal){
        this.animalChange='cat'
        this.fact='click the button for a dog fact'
        this.animalImg='/images/jake.png'

      }else{
        this.animalChange='dog'
        this.fact='click the button for a cat fact'
        this.animalImg='/images/cake.png'
      }
    },
    async setCatFacts(){
      console.log('HAI CLICCATO')
      this.fact=await axios.get('https://meowfacts.herokuapp.com/')
          .then((response)=>{
            console.log(response.data.data[0])
            return response.data.data[0]
          })
    },
    async setDogFacts() {

      this.fact = await axios.get('http://localhost:8000/dogFact/random')
          .then((response) => {
            console.log(response.data)
            return response.data.dogFact
          })
      console.log(this.dogFact)
    }
  }
}
</script>

<style lang="scss" scoped>
.curiosityPage{
}
.comicCloud img{
  width:100%
}
.comicCloud{
  background-image: url("../../public/images/comic_cloud.png");
  background-repeat: no-repeat;
  background-size: contain;
  color:var(--dark);
}
.comicCloud p{
  text-align:center;
  vertical-align: middle;
  margin-top: 7rem;
}
.changeAnimal{
  display:flex;
  flex-direction: column;
  width: 40%;
}

.changeAnimal img{
  width:100%;
  height: 100%;
}
@media (max-width: 768px) {
  .changeAnimal{
    order:13
  }
  .comicCloud{
    order:-1;
    background-image: none;
    background-color: var(--dark);
    border:1px solid var(--dark-alt);
    color:var(--light);
    border-radius: 1rem;
    width: 90%;
    margin: 0 auto;
    padding: 1rem 0;
    p{
      margin-top: 1rem;
    }
    button{
      color:var(--light)
    }
  }
  .changeAnimal{
    width: 100%;
  }
}
</style>