<template>
  <main>
    <section class="container">
      <h2>Página home da loja</h2>

      <div class="row">
        <h3>Nossos produtos</h3>

        <ProductSearch
          name="produtos"
        />
      </div>

      <!-- <div class="row">
        <h3>Nossas camisetas</h3>

        <ProductSearch
          :search_type="'category'"
          :search_id="7"
          name="camisetas"
        />
      </div> -->
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
  },
  mounted(){

    //console.log(swiper)
  }
};
</script>

<style>
</style>
