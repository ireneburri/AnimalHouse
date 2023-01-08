<template>

  <header class="pad">
      <h1 class="websiteTitle" style="width: fit-content;">AnimalHouse</h1>
    <a href="https://site212224.tw.cs.unibo.it/front/home" class="btn shopButton" >Go to the shop</a>
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
  display: flex;
  flex-direction: column;

}
.shopButton{
  margin:0 auto;
  background-color:var(--dark);
  border-color: var(--light);
  color: var(--light)
}
.websiteTitle {
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
  .websiteTitle{
    font-size: 2rem;
  }
}
</style>