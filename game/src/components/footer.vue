<template>
  <footer>
    <div class="row">
      <a class="col-md-4">.col-md-4</a>
      <a class="col-md-4">.col-md-4</a>
      <a class="col-md-4">.col-md-4</a>
    </div>
    <div class="row">
      <a class="col-md-4">.col-md-4</a>
      <a class="col-md-4">.col-md-4</a>
      <a class="col-md-4">.col-md-4</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "vueFooter"
}
</script>
<style scoped>
footer{
  background-color: var(--dark-alt);
  position: absolute;
  bottom: 0;
  width: 100%;
}
a{
  text-decoration: none;
  color: var(--light)
}
@media (max-width: 768px) {
  main{
  }
}
</style>