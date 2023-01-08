<template>
  <div class="aContainer row" style="margin:auto auto">
  <img v-bind:src="animal.img" class="col-lg-6" alt="{{animal.name}}">

  <div class="dataContainer col-xl-4">
    <div><b>name:</b> {{animal.name}}</div>
    <div><b>type:</b> {{animal.type}}</div>
    <div><b>active time: {{animal.active_time}}</b></div>
    <div><b>minimum length:</b> {{animal.length_min}}</div>
    <div><b>maximum length:</b> {{animal.length_max}}</div>
    <div><b>minimum weight:</b> {{animal.weight_min}}</div>
    <div><b>maximum weight:</b> {{animal.weight_max}}</div>
    <div><b>lifespan:</b> {{animal.lifespan}}</div>
    <div><b>habitat:</b> {{animal.habitat}}</div>
    <div><b>diet:</b> {{animal.diet}}</div>
    <div><b>curiosity:</b> {{animal.curiosity}}</div>
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