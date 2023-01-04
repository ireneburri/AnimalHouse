<template>
  <div class="animalContainer">
      <img v-bind:src="animal.img">
    <div class="dataContainer">
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

<style scoped>
.animalContainer{
  display:flex;
  flex-direction: row;
  align-self: center;
  margin:auto
}
.animalContainer .dataContainer{
  display:flex;
  flex-direction: column;
  color: var(--dark);
  margin:auto;
  padding:2rem;
  background-color: var(--light);
  border-radius: 1rem;
}
.dataContainer div{
  text-align: left;
  margin-left:5%
}
img{
  width:50%;
  max-height:70vh;
  object-fit:cover;
  padding: 1rem
}
</style>