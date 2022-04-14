<template>
  <section class="product-listing">
    <router-link
      v-for="produto in produtos"
      :key="produto.id"
      class="product-router-link"
      :to="`/p/${produto.sku}`"
    >
      <ProductCard :produto="produto"/>
    </router-link>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import service from "@/services/catalogo-service.js";

export default {
  name: "ProductSearch",
  components: {
    ProductCard,
  },
  data() {
    return {
      produtos: [],
      swiper: {},
    };
  },
  methods: {
    async listarProdutos() {
      const response = await service.listarProdutos();
      if (response.data.success) this.produtos = response.data.data;
    },
  },
  mounted() {
    this.listarProdutos();
  },
};
</script>

<style lang="css">
.product-router-link{
  display: block;
}
.product-listing {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
