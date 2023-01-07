<template>
  <div class="aContainer row" style="margin:auto auto">
  <img v-bind:src="animal.img" class="col-xl-6" alt="{{animal.name}}">

  <div class="dataContainer col-xl-4">
    <div>name: {{animal.name}}</div>
    <div>type: {{animal.type}}</div>
    <div>active time: {{animal.active_time}}</div>
    <div>minimum length: {{animal.length_min}}</div>
    <div>maximum length: {{animal.length_max}}</div>
    <div>minimum weight: {{animal.weight_min}}</div>
    <div>maximum weight: {{animal.weight_max}}</div>
    <div>lifespan: {{animal.lifespan}}</div>
    <div>habitat: {{animal.habitat}}</div>
    <div>diet: {{animal.diet}}</div>
    <div>curiosity: {{animal.curiosity}}</div>
  </div>
  </div>
</template>

<script>

export default {
  name: "vueAnimal",
  props:{
    animal: {}
  },
  methods:{
  },
}
</script>

<style lang="scss" scoped>
.aContainer{
  width: 90%;
  background-color: var(--dark);
  border-radius: 1rem;
  padding: 1rem;
  img{
    object-fit:cover;
    padding: 1rem;
    max-height:35rem;
    max-width: 40rem;
    margin: 0 auto
  }
  .dataContainer{
    color: var(--dark);
    margin:auto;
    padding:1rem;
    background-color: var(--light);
    border-radius: 1rem;
    div{
      text-align: left;
      margin-left:5%
    }
  }
}
</style>