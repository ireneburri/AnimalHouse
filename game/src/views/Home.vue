<template>
  <main class="homePage">
    <!--<h3 v-if="user">hi, {{ user.username }}</h3>-->

    <div class="row">
      <div class=" containerOne" :class="setContainer">
        <form class="form-signin" @submit.prevent="handleSubmit" v-if="isVisible">
          <div v-if="errors.length" style="color:red">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Your pet name" />
          </div>
          <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Sex</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sexRadios" id="sexRadios1" value="male" checked v-model="sex">
                  <label class="form-check-label" for="gridRadios1" style="color:var(--light)">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sexRadios" id="sexRadios2" value="female" v-model="sex">
                  <label class="form-check-label" for="gridRadios2"  style="color:var(--light)">
                    Female
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sexRadios" id="sexRadios3" value="other" v-model="sex">
                  <label class="form-check-label" for="gridRadios3"  style="color:var(--light)">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="form-group">
            <label>Species or Breed*</label>
            <input type="text" class="form-control" v-model="type" placeholder="Your pet species/breed*"/>
          </div>
          <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Size</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sizeRadios" id="sizeRadios1" value="Small" v-model="size">
                  <label class="form-check-label" for="gridRadios1" style="color:var(--light)">
                    Small
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sizeRadios" id="sizeRadios2" value="Medium" v-model="size">
                  <label class="form-check-label" for="gridRadios2"  style="color:var(--light)">
                    Medium
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="sizeRadios" id="sizeRadios3" value="Large" v-model="size">
                  <label class="form-check-label" for="gridRadios3"  style="color:var(--light)">
                    Large
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);">Submit</button>
        </form>
        <div v-else>
          <h4 v-if="pets.length">Animals similar to {{name}} in sale:</h4>
          <div  v-else>
            We couldn't find any animal similar to {{name}}.. Do you want to do a more generic search?
            <button @click="searchPets" class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" > search again </button>
          </div>
          <div class="row petContainer">
            <Pet v-for="pet in pets"
                 :key="pet._id"
                 :name="pet.name"
                 :img="pet.img"
                 :age="pet.age"
                 :sex="pet.sex"
                 :species="pet.species"
                 :breed="pet.breed"
                 :price="pet.price"
                 class="col-lg-4"
            />
          </div>
          <h4 v-if="items.length">Items for {{name}}:</h4>
          <div  v-else>
            We couldn't find any product similar to {{name}}.. Do you want to do a more generic search?
            <button @click="searchItems" class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);" > search again </button>
          </div>
          <div class="row itemContainer">
            <Item v-for="item in items"
                  :key="item._id"
                  :name="item.name"
                  :img="item.img"
                  :size="item.size"
                  :price="item.price"
                  class="col-lg-4"
            ></Item>
          </div>
          <h4 v-if="services.length">Services for {{name}}:</h4>
          <div class="row serviceContainer">
            <Location v-for="service in services"
                      :key="service._id"
                      :name="service.name"
                      :img="service.img"
                      :category="service.category"
                      :time="service.time"
                      :price="service.price"
                      :mode="service.mode"
                      class="col-lg-4"
            ></Location>
          </div>
      </div>

      </div>
      <div class="oak" :class="setContainer2">
        <img src="../../public/images/oakSquared2.png" :class="oak" class="oakImg">
        <div class="oakLine">{{oakLine}}</div>
        <div class="buttonsContainer container" v-if="!isVisible">
          <button @click="goBack" class="btn btn-primary" style=" background-color:var(--dark-alt); border-color: var(--light);">go back</button>
          <button @click="animalLink" class="btn btn-primary" style=" background-color:var(--dark-alt); border-color: var(--light);">Animal House</button>
        </div>

      </div>
    </div>
  </main>
</template>
<script>
import {mapGetters} from 'vuex'
import axios from "axios";
import Pet from "@/components/Pet.vue";
import Item from "@/components/Item.vue";
import Location from "@/components/Location.vue";
export default {
  name: 'vueHome',
  components:{
    Item,
    Pet,
    Location
  },
  computed:{
    ...mapGetters(['user'])
  },
  data(){
    return{
      name:'',
      sex:'',
      type:'',
      size:'Small',
      pets:'',
      items:'',
      services:'',
      isVisible:true,
      setContainer:'col-md-6',
      setContainer2:'col-md-6',
      oak:'',
      oakLine:'Hello! fill out the form on the side and find out what animalHouse has in store for you and your pet!',
      errors:[]
    }
  },
  methods:{
    async handleSubmit(){

      if(this.type===''){
        if(this.errors.length===0){
          this.errors.push('Species or breed required.');
        }
      }else{
        this.errors=[]
        this.isVisible=false
        this.setContainer='col-md-8 order-last'
        this.setContainer2='col-md-4'
        this.oak='oakSubmit'
        this.oakLine='Oh wow! Look at all this beautiful stuff! You should really go check out the site!'
        if(this.name===''){
          this.name='your pet'
        }
        //console.log(this.type)
        this.pets= await axios.get(`http://site212224.tw.cs.unibo.it/animal/type/${this.type}`)
            .then((response)=>{
              return response.data
            })
        //console.log(this.pets)
        //transform a possible breed in a species
        if(this.pets.length>0){
          this.species=this.pets[0].species
        }
        //console.log(this.species)

        this.items = await axios.get(`http://site212224.tw.cs.unibo.it/item/species/${this.species}/size/${this.size}`)
            .then((response)=>{
              return response.data
            })
        //console.log(this.items)

        this.services = await axios.get(`http://site212224.tw.cs.unibo.it/service/size/3`)
            .then((response)=>{
              return response.data
            }).catch(err=>{
              console.log(err)
            })
        console.log(this.services)
        console.log(this.services.length)
      }

    },
    goBack(){
      this.isVisible=!this.isVisible
      this.setContainer='col-md-6'
      this.setContainer2='col-md-6'
      this.oak='oakBack'
      this.oakLine='Hello! fill out the form on the side and find out what animalHouse has in store for you and your pet!'
      this.name=''
      this.type=''
      this.sex=''
      this.species=''
      this.breed=null
      this.size='Small'
      this.errors=[]
    },
    animalLink(){
      this.$router.push('/login')
    },
    async searchPets(){
      this.pets= await axios.get(`http://site212224.tw.cs.unibo.it/animal/type/all`)
          .then((response)=>{
            return response.data
          }).catch(err=>{
            console.log(err)
          })
    },
    async searchItems(){
      this.items= await axios.get(`http://site212224.tw.cs.unibo.it/item/species/all/size/all`)
          .then((response)=>{
            return response.data
          }).catch(err=>{
            console.log(err)
          })
    }
  }

}
</script>

<style lang="scss" scoped>
.oak{
  display:flex;
  flex-direction: column;
  margin:0;
  padding:0;
  .oakImg{
    width: 100%;
    display:flex;
    margin:0;
    padding:0;
  }
  .oakLine{
    background-color: #F0F0F0;
    border:0.2rem solid gray;
    border-radius: 0.5rem;
    margin-left: 0;
    padding:2rem;
    margin-top:-20%;
    z-index: 99;
  }
}

.oakSubmit{
  transform: scaleX(-1);
  transition: transform 0.8s ease-in;
}
.oakBack{
  transform: scaleX(1);
  transition: transform 0.8s ease-in;
}
main{
  text-align: center;
  display:flex;
  flex-direction: column;
  font-size: 1rem;
  color:var(--dark);
}
form{
  text-align: left;
  width: 80%;
  background-color: var(--dark);
  padding: 1rem;
  border-radius: 1rem;
  color:var(--light);
  margin:0 auto
}
.col-md-6{;
  padding: 1rem 4rem;
}
.button{
  background-color: var(--dark-alt);
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  .material-icons, .text{
    color:var(--light);
  }
  .material-icons{
    font-size:7rem
  }
}

@media (max-width: 1024px) {

  .button{
    border-radius: 1.5rem;
    .material-icons{
      font-size: 2rem;
    }
  }
  .col-4{
    padding:0.4rem 0.9rem
  }
  form{
    width: 100%;
  }
  main{
    padding-left: 6rem;
  }
}
</style>