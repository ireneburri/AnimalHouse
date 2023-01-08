<template>
<a :href="link" style="display: inline-block; max-width: 20rem; margin:0.5rem auto">
  <div class="petComponent">
    <div>{{name}}</div>
    <img :src="img" alt="{{name}}">
    <div>age: {{age}}</div>
    <div>{{sex}}</div>
    <div>{{returnBreed}}</div>
    <div>price: {{price}} $</div>
  </div>
</a>
</template>

<script>
export default {
  name: "vuePet",
  props:{
    id: String,
    name: String,
    age:Number,
    sex:String,
    species:String,
    breed:String,
    price:String,
  },
  computed:{
    returnBreed(){
      if(this.breed==null){
        return this.species
      }
      return this.breed
    },
    link(){
      const link = `https://site212224.tw.cs.unibo.it/front/animal:${this.id}`
      return link
    },
    img(){
      return `${this.id}.png`
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