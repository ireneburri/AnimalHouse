<template>

  <header class="pad">
      <h1 class="pageTitle" style="width: fit-content;">AnimalHouse</h1>
  </header>

</template>

<script>
export default {
  name: "vueHeader"
}
</script>

<style lang="scss" scoped>
header{
  background-color:  var(--dark-alt);
  padding: 1rem;

}
.pageTitle {
  color: var(--light);
  font-family: "Great Vibes",
  cursive;
  font-size: 5rem;
  font-weight: normal;
  width:100%;
  margin:0 auto;
  text-align: center;
  text-shadow: 0 1px 1px #fff;
}
@media (max-width: 768px) {
  .pageTitle{
    font-size: 2rem;
  }
}
</style>