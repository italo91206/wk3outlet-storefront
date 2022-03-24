<template>
  <main>
    <section class="container">
      <h2>Página home da loja</h2>
      <ProductSearch/>
    </section>
  </main>
</template>

<script>
import ProductSearch from "@/components/ProductSearch.vue";

export default {
  name: "HomePage",
  components: {
    ProductSearch,
  },
  data(){
    return {
      produtos: [],
      foo: 'bar'
    }
  }
};
</script>

<style>
</style>
