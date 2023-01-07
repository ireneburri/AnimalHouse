<template>

  <main class="curiosityPage">
    <div class="row" style="width: 90%; margin: 0 auto">
      <div class="col-md-6 changeAnimal">
        <img v-bind:src="animalImg" alt="{{animalName}}">
        <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" @click="switchAnimal">switch
          for {{ animalChange }} facts</button>
      </div>

      <div v-if="animal" class="col-md-6 comicCloud">

        <p>{{fact}}</p>
        <button class="btn btn-animal" @click="setDogFacts">Dog Facts</button>
      </div>

      <div v-else class="col-md-6 comicCloud" style="padding:3rem">
        <p>{{fact}}</p>
        <button class="btn btn-animal" @click="setCatFacts">Cat Facts</button>
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
      animalImg:'/images/jake.png',
      animalName:'Jake the Dog'
    }
  },
  methods:{
    switchAnimal(){
      this.animal=!this.animal
      if(this.animal){
        this.animalChange='cat'
        this.animalName='Jake the Dog'
        this.fact='click the button for a dog fact'
        this.animalImg='/images/jake.png'

      }else{
        this.animalName='Cake the Cat'
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

      this.fact = await axios.get('https://site212224.tw.cs.unibo.it/dogFact/random')
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
.comicCloud{
  background-color: white;
  border:1rem solid var(--dark-alt);
  border-radius: 20rem;
  color:var(--dark);
  p{
    text-align:center;
    vertical-align: middle;
    margin-top: 20%;
  }
  .btn-animal{
    margin:0.5rem 0;
    background-color:var(--dark-alt);
    border-color: var(--light);
    color:white;
  }
}
.changeAnimal{
  display:flex;
  flex-direction: column;
  width: 40%;
  img {
    max-width: 40rem;
  }
}
@media (max-width: 1160px) {
  .comicCloud{
    padding:3rem;
    p{
      margin-top:10%
    }
    .btn-animal{
      margin:0
    }
  }
  @media (max-width: 1160px) {

  }
}
@media (max-width: 768px) {
  .comicCloud{
    order:-1;
  }
  .changeAnimal{
    width: 100%;
  }
}
</style>