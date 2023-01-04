<template>
  <div style="display: inline-block; max-width: 20rem; margin:0 auto">
    <div class="itemComponent">
      <div>{{name}}</div>
      <img :src="img">
      <div>for {{size}} sizes</div>
      <div>{{price}}$</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vueItem",
  props:{
    name:String,
    img:String,
    size:String,
    price:Number
  }
}
</script>

<style lang="scss" scoped>
.itemComponent{
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