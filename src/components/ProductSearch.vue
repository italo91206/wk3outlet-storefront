<template>
  <section class="product-listing">
    <div :id="`swiper-container--${name}`" class="swiper-container">
      <div class="swiper-wrapper">
        <router-link
          v-for="produto in produtos"
          :key="produto.id"
          class="product-router-link swiper-slide"
          :to="`/p/${produto.sku}`"
        >
          <ProductCard :produto="produto" />
        </router-link>
      </div>

      <div class="swiper-navigation">
        <a class="swiper-navigation--prev">
          <i class="fas fa-chevron-left"></i>
        </a>

        <a class="swiper-navigation--next">
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>

      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import service from "@/services/catalogo-service.js";
import Swiper, { Navigation, Pagination } from 'swiper'

export default {
  name: "ProductSearch",
  props: {
    search_type: String,
    search_id: Number,
    search_query: String,
    name: String
  },
  components: {
    ProductCard,
  },
  data() {
    return {
      produtos: [],
      loading: true,
      swiper: null,
    };
  },
  methods: {
    async listarProdutos() {
      let {search_type, search_id, search_query} = this
      // console.log({search_type, search_id, search_query})

      await service
        .listarProdutos({search_type, search_id, search_query})
        .then((response) => {
          if (response.data.success) this.produtos = response.data.data;
          else this.$toast.error(response.data.message);
        })
        .catch((error) => {
          console.log("ProductSearch component: something bad happened");
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  async mounted() {
    await this.listarProdutos().then(() => {
      const class_id = `#swiper-container--${this.name}`
      new Swiper(class_id, {
        modules: [Navigation, Pagination],
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: '.swiper-navigation--prev',
          prevEl: '.swiper-navigation--next'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      })
    })
  },
  watch: {},
};
</script>

<style lang="css">
.swiper-slide.product-router-link {
  display: block;
  width: unset;
}
.swiper-wrapper {
  overflow: hidden;
}
/* .product-listing {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
} */
</style>
