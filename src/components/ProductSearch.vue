<template>
  <section class="product-listing">
    <div class="swiper">
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
    </div>
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
      loading: true,
      swiper: null,
    };
  },
  methods: {
    async listarProdutos() {
      await service
        .listarProdutos()
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
  mounted() {
    let script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.1.0/swiper-bundle.min.js"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("referrerpolicy", "no-referrer");
    script.setAttribute(
      "integrity",
      "sha512-uz9KhDW9ZdiJU79RDPNuHE4Z9aUOYTVargiMzYbe8Z3j5vBHxBMmlvGw1Xa09CmV6tCUOhGazG4pTWsuDJd1xw=="
    );
    script.onload = () => {
      // eslint-disable-next-line
      new Swiper(".swiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
      });
    };
    document.body.appendChild(script);
    this.listarProdutos();
  },
  watch: {},
};
</script>

<style lang="css">
.swiper-slide.product-router-link {
  display: block;
  width: unset;
}
.swiper {
  overflow: hidden;
}
/* .product-listing {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
} */
</style>
