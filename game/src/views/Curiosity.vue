<template>
  <main class="contactPage">

    <div class="row">
      <div class="col-md-2">
        <form class="form-signin" @submit.prevent="handleSubmit">
          <div class="type">
            <div class="form-check" >
              <div>
                <p class="category">Type</p>
              </div>
              <input class="form-check-input" type="radio" name="typeAnimal" v-model="race" id="allAnimal" value="all" checked>
              <label class="form-check-label" for="reptileAnimal">
                All
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="typeAnimal" v-model="race" id="mammalAnimal" value="mammal">
              <label class="form-check-label" for="mammalAnimal">
                Mammal
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="typeAnimal" v-model="race" id="birdAnimal" value="bird">
              <label class="form-check-label" for="birdAnimal">
                Bird
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="typeAnimal" v-model="race" id="reptileAnimal" value="reptile">
              <label class="form-check-label" for="allAnimal">
                Reptile
              </label>
            </div>
          </div>
          <div class="size">
            <div class="form-check">
              <div>
                <p class="category">Size</p>
              </div>
              <input class="form-check-input" type="radio" name="sizeAnimal" v-model="size" id="allAnimal" value="0" checked>
              <label class="form-check-label" for="allAnimal">
                All
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sizeAnimal" v-model="size" id="bigAnimal" value="1">
              <label class="form-check-label" for="bigAnimal">
                Big
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sizeAnimal" v-model="size" id="smallAnimal" value="-1">
              <label class="form-check-label" for="smallAnimal">
                Small
              </label>
            </div>
          </div>
          <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);">Submit</button>
        </form>
      </div>
      <div class="col-md-10">
        <div class="aContainer container">
          <Animal v-if="isVisible" :animal="animal"/>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import Animal from "../components/Animal.vue";
import axios from "axios";

export default{
  //components: {Animal},
  name:'vueContact',
  components:{
    Animal
  },
  data(){
    return{
      request:'',
      isVisible:false,
      animal:'',
      animals:'',
      //size: 1 big 0 all -1 small
      size:'0',
      //
      race:"all",
    }
  },
  methods:{
    async handleSubmit() {
      this.isVisible = true
      console.log('ciao')
      console.log(this.race)
      console.log(this.size)
      this.animal= await axios.get(`http://localhost:8000/quiz/type/${this.race}?/size/${this.size}?`)
          .then((response) => {
            console.log(response.data)
            return response.data
          }).catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-check{
  color: var(--dark);
  text-align: left;
}
.form-signin{
  background-color: var(--dark);
  border-radius: 1rem;
  .form-check{
    color:var(--light);
    margin: 0 1rem;
  }
  .category{
    background-color: var(--dark-alt);
    display:inline;
    padding:0.2rem;
    border-radius: 0.5rem;
  }
  .size, .type{
    padding: 1rem 0
  }
}
.aContainer{
  //margin:0 1rem;
  width: 90%;
  background-color: var(--dark);
  border-radius: 1rem;
}
@media (max-width: 768px) {
  from-signin{
    display:flex;
    flex-direction: row;
  }
}
</style>