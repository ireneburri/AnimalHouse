<template>
<div style="display: inline-block; max-width: 20rem; margin:0.5rem auto">
  <div class="petComponent">
    <div>{{name}}</div>
    <img :src="img">
    <div>age: {{age}}</div>
    <div>{{sex}}</div>
    <div>{{returnBreed}}</div>
    <div>price: {{price}} $</div>
  </div>
</div>
</template>

<script>
export default {
  name: "vuePet",
  props:{
    name: String,
    img:String,
    age:Number,
    sex:String,
    species:String,
    breed:String,
    price:Number
  },
  computed:{
    returnBreed(){
      if(this.breed==null){
        return this.species
      }
      return this.breed
    }
  }
}
</script>

<style lang="scss" scoped>
.petComponent{
  border:0.5rem solid var(--dark-alt);
  width: 100%;
  border-radius: 1rem;
  margin: 0 0.5rem;
  background-color: var(--dark);
  color:var(--light);
  display: inline-block;
  flex-direction: column;
    img{
      margin: 0 auto;
      width:  10rem;
      height: 10rem;
      object-fit: cover;
    }
}
</style>