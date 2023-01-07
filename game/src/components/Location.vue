<template>
  <a v-bind:href="link" style="display: inline-block; max-width: 20rem; margin:0 auto">
    <div class="serviceComponent">
      <div>{{name}}</div>
      <img :src="img" alt="{{name}}">
      <div>{{category}}</div>
      <div>{{mode}}</div>
      <div>{{price}}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: "vueLocation",
  props:{
    name:String,
    img:String,
    category:String,
    time:String,
    price:Number,
    mode:String,
  },
  computed:{
    link(){
      const link =`https://site212224.tw.cs.unibo.it/front/singleservice:${this.name}`
      return link

    }
  }
}
</script>

<style lang="scss" scoped>
.serviceComponent{
  border:0.5rem solid var(--dark-alt);
  border-radius: 1rem;
  margin: 0 0.5rem;
  background-color: var(--dark);
  width: 100%;
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